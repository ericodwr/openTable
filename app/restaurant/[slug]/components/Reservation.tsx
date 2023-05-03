'use client';

import React, { useState } from 'react';
import { partySize as partySizes, times } from '../../../../data';
import DatePicker from 'react-datepicker';
import useAvailabilities from '../../../../hooks/useAvailabilities';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import {
  Time,
  convertToDisplayTime,
} from '../../../../utils/convertToDisplayTime';

const Reservation = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState('');
  const [day, setDay] = useState(new Date().toISOString().split('T')[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0]);
      return setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  const filteredTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }

      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }

      if (time.time == closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWithinWindow;
  };

  return (
    <div className="w-full text-reg">
      <div className=" w-full bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        {/* select amount of person */}
        <div className="my-3 flex flex-col">
          <label htmlFor="party">Party Size</label>
          <select
            className="py-3 border-b font-light"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
          >
            {partySizes.map((size) => (
              <option value={size.value} key={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
        {/* select amount of person */} {/* select date and time */}
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Date</label>
            <DatePicker
              className="py-3 border-b font-light text-reg w-20"
              dateFormat={'MMM dd'}
              wrapperClassName="w-[48%]"
              selected={selectedDate}
              onChange={handleChangeDate}
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              className="py-3 border-b font-light"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              {filteredTimeByRestaurantOpenWindow().map((time) => (
                <option value={time.time} key={time.displayTime}>
                  {time.displayTime}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* select date and time */} {/* button */}
        <div className="mt-5">
          <button
            className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            onClick={handleClick}
            disabled={loading ? true : false}
          >
            {loading ? <CircularProgress color="inherit" /> : 'Find a time'}
          </button>
        </div>
        {/* button */}
        {data && data.length ? (
          <div className="mt-4">
            <p className="text-reg">Select a Time</p>
            <div className="flex flex-wrap mt-2">
              {data.map((time) => {
                return time.available ? (
                  <Link
                    href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                    key={time.time}
                  >
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(time.time as Time)}
                    </p>
                  </Link>
                ) : (
                  <p className="bg-gray-300" p-2 w-24 mb-3 mr-3></p>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Reservation;
