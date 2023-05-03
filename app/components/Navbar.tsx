'use client';

import Link from 'next/link';
import AuthModal from './AuthModal';
import { useContext } from 'react';
import { AuthenticationContext } from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { data, loading } = useContext(AuthenticationContext);

  const { signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        {!loading && (
          <div className="flex">
            {data ? (
              <button
                onClick={signout}
                className="bg-red-200 border p-1 px-4 rounded
            mr-3"
              >
                Sign Out
              </button>
            ) : (
              <>
                <AuthModal isSignin={true} />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
