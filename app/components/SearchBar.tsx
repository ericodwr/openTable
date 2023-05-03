'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleClick = (e: any): void => {
    if (location == '') {
      router.push(`/search`);
    }
    const formatedLocation = location.toLowerCase();
    router.push(`/search?city=${formatedLocation}`);
    setLocation('');
  };

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        type="text"
        className="rounded  mr-3 p-2 w-[450px]"
        placeholder="State, City, or Town"
        value={location}
        required
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        onClick={handleClick}
        className="rounded bg-red-600 px-9 py-2 text-white "
      >
        Let's Go
      </button>
    </div>
  );
};

export default SearchBar;
