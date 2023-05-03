'use client';

import { ChangeEvent, useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';
import useAuth from '../../hooks/useAuth';
import { AuthenticationContext } from '../../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disabled, setDisabled] = useState(true);

  const { loading, data, error } = useContext(AuthenticationContext);

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });
  const { signin, signup } = useAuth();

  const handleClick = async () => {
    if (isSignin) {
      try {
        setDisabled(true);
        await signin(
          {
            email: inputs.email,
            password: inputs.password,
          },
          handleClose,
        );
        setDisabled(false);
        // handleClose();
      } catch (error: any) {
        console.log(error);
      }
    } else if (!isSignin) {
      try {
        setDisabled(true);
        await signup(inputs, handleClose);
        setDisabled(false);
        handleClose();
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isSignin) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.city &&
        inputs.phone
      ) {
        return setDisabled(false);
      }
    }

    return setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const renderContent = (signin: string, signup: string) => {
    return isSignin ? signin : signup;
  };



  return (
    <div>
      <button
        className={`${
          isSignin && 'bg-blue-400 text-white'
        } border p-1 px-4 rounded
              mr-3
              `}
        onClick={handleOpen}
      >
        {renderContent('Sign In', 'Sign Up')}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <Box sx={style} className="flex justify-center items-center">
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={style}>
            {error && <Alert severity="error">{error}</Alert>}
            <div className="p-2">
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {renderContent('Sign In', 'Create Account')}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    'Log Into Your Account',
                    'Create Your OpenTable Account',
                  )}
                </h2>
                <AuthModalInput
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignin={isSignin}
                />
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContent('Sign In', 'Create Account')}
                </button>
              </div>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}
