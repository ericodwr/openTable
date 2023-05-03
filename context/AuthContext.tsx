'use client';

// import { User } from '@prisma/client';
import React, { useState, createContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { getCookie } from 'cookies-next';
import axios from 'axios';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState((state) => ({
      data: null,
      error: null,
      loading: true,
    }));
    try {
      const jwt = getCookie('jwt');

      if (!jwt) {
        return setAuthState((state) => ({
          data: null,
          error: null,
          loading: false,
        }));
      }

      const response = await axios.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // set default cookie to headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      setAuthState((state) => ({
        data: response.data,
        error: null,
        loading: false,
      }));
      console.log(response);
    } catch (error: any) {
      return setAuthState((state) => ({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
