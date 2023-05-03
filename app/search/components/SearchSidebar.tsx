import { Cuisine, Location, PrismaClient, Price } from '@prisma/client';

import Link from 'next/link';

const SearchSidebar = ({
  cuisines,
  locations,
  searchParams,
}: {
  cuisines: Cuisine[];
  locations: Location[];
  searchParams: { city?: string; cuisine?: string; price?: Price };
}) => {
  const prices = [
    {
      price: Price.CHEAP,
      label: '$',
    },
    {
      price: Price.REGULAR,
      label: '$$',
    },
    {
      price: Price.EXPENSIVE,
      label: '$$$',
    },
  ];

  return (
    <div className="w-1/5">
      {/* city */}
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((loc) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                city: loc.name,
              },
            }}
            key={loc.id}
            className="font-light text-reg"
          >
            {loc.name}
          </Link>
        ))}
      </div>
      {/* city */}
      {/* cuisine */}
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            key={cuisine.id}
            className="font-light text-reg"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      {/* cuisine */}

      {/* price */}
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label }) => (
            <Link
              key={label}
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className="border w-full text-reg font-light rounded-l p-2 mx-2"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      {/* price */}
    </div>
  );
};

export default SearchSidebar;
