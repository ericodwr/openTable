import { Cuisine, Price, PrismaClient } from '@prisma/client';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import SearchSidebar from './components/SearchSidebar';

export const metadata = {
  title: 'Search - OpenTables',
};

interface searchParams {
  city?: string;
  cuisine?: string;
  price?: Price;
}

const prisma = new PrismaClient();

const fetchSearchRestaurants = (searchParams: searchParams) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    Review: true,
  };

  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = () => prisma.location.findMany();

const fetchCuisines = () => prisma.cuisine.findMany();

export default async function Search({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  const restaurants = await fetchSearchRestaurants(searchParams);

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      {/* header */}
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        {/* quick filter */}
        <SearchSidebar
          cuisines={cuisines}
          locations={locations}
          searchParams={searchParams}
        />
        {/* quick filter */}
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant: any) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <>
              <p>Sorry we cannot found in this area</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
