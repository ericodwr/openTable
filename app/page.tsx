import Header from './components/Header';
import Card from './components/Card';
import { Location, Price, Cuisine, Review } from '@prisma/client';
import { prismaClient } from '../utils/prismaHelper';

export interface restaurantCardType {
  id: number;
  name: string;
  main_image: string;
  price: Price;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  Review: Review[];
}

const prisma = prismaClient;

const fetchRestaurants = async (): Promise<restaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      Review: true,
    },
  });

  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      {/* header */}
      <Header />
      {/* header */}
      {/* cards */}
      <div className="py-3 px-36 mt-10 flex flex-wrap">
        {/* card */}
        {restaurants.map((restaurant: restaurantCardType) => (
          <Card key={restaurant.id} restaurant={restaurant} />
        ))}

        {/* Card */}
      </div>
      {/* cards */}
    </main>
  );
}
