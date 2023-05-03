'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import useReservation from '../../../../hooks/useReservation';
import { CircularProgress } from '@mui/material';

const ReserveForm = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const [inputs, setInputs] = useState({
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerEmail: '',
    bookerOccasion: '',
    bookerRequest: '',
  });

  const [day, time] = date.split('T');

  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { error, loading, createReservation } = useReservation();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });

    console.log(booking);
  };

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  return (
    <>
      {didBook ? (
        <div>
          <h1>You are all bookep up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <div className="mt-10 flex flex-wrap justify-between w-[660px]">
            <input
              type="text"
              className="border rounded p-3 w-80 mb-4"
              placeholder="First Name"
              name="bookerFirstName"
              value={inputs.bookerFirstName}
              onChange={handleChangeInput}
            />
            <input
              type="text"
              className="border rounded p-3 w-80 mb-4"
              placeholder="Last Name"
              value={inputs.bookerLastName}
              onChange={handleChangeInput}
              name="bookerLastName"
            />
            <input
              type="text"
              className="border rounded p-3 w-80 mb-4"
              placeholder="Phone Number"
              value={inputs.bookerPhone}
              onChange={handleChangeInput}
              name="bookerPhone"
            />
            <input
              type="text"
              className="border rounded p-3 w-80 mb-4"
              placeholder="Email"
              name="bookerEmail"
              value={inputs.bookerEmail}
              onChange={handleChangeInput}
            />
            <input
              type="text"
              className="border rounded p-3 w-80 mb-4"
              placeholder="Occassion (optional)"
              value={inputs.bookerOccasion}
              name="bookerOccasion"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              className="border rounded p-3 w-80 mb-4"
              placeholder="Requests (optional)"
              value={inputs.bookerRequest}
              name="bookerRequest"
              onChange={handleChangeInput}
            />
          </div>
          <button
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              'Complete Reservation'
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </>
  );
};

export default ReserveForm;
