import axios, { Axios } from 'axios';
import { useContext } from 'react';
import { getCookie, removeCookies } from 'cookies-next';

import { AuthenticationContext } from '../context/AuthContext';

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  // Sign In
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void,
  ) => {
    try {
      setAuthState((state) => ({
        ...state,
        loading: true,
      }));
      const response = await axios.post(`/api/auth/signin`, {
        email,
        password,
      });
      console.log(response);

      setAuthState((state) => ({
        ...state,
        data: response.data,
      }));
      // handleClose();
    } catch (error: any) {
      setAuthState((state) => ({
        ...state,
        error: error.response.data.errorMessage,
      }));
      console.log(error);
    }

    setAuthState((state) => ({
      ...state,
      loading: false,
    }));
  };

  // Sign Up
  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void,
  ) => {
    try {
      setAuthState((state) => ({
        ...state,
        loading: true,
      }));
      const response = await axios.post(`/api/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
        city,
        phone,
      });
      console.log(response);

      setAuthState((state) => ({
        ...state,
        data: response.data,
      }));
      handleClose();
    } catch (error: any) {
      setAuthState((state) => ({
        ...state,
        error: error.response.data.errorMessage,
      }));
      console.log(error);
    }

    setAuthState((state) => ({
      ...state,
      loading: false,
    }));
  };

  // signout
  const signout = async () => {
    removeCookies('jwt');
    setAuthState((state) => ({
      data: null,
      error: null,
      loading: false,
    }));
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
