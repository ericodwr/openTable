import { Review } from '@prisma/client';

// components
import RestaurantNavbar from './components/RestaurantNavbar';
import Title from './components/Title';
import Ratings from './components/Ratings';
import Description from './components/Description';
import Images from './components/Images';
import Reviews from './components/Reviews';
import Reservation from './components/Reservation';
import { prismaClient } from '../../../utils/prismaHelper';

// metadata
export async function generateMetadata({ params }: any): Promise<any> {
  const data = await fetchTitle(params.slug);

  if (data) {
    return {
      title: data,
    };
  } else {
    return {
      title: 'wrong credentials',
    };
  }
}

const fetchTitle = async (slug: string): Promise<any> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
    },
  });

  return restaurant?.name;
};
// metadata

interface restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  main_image: string;
  slug: string;
  open_time: string;
  close_time: string;
  Review: Review[];
}

const prisma = prismaClient;

const fetchDetailRestaurant = async (slug: string): Promise<restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      main_image: true,
      slug: true,
      Review: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    throw Error('Cannot find the restaurant');
  }

  return restaurant;
};

export default async function RestaurantDetails(props: any) {
  const { slug }: { slug: string } = props.params;

  const restaurantData = await fetchDetailRestaurant(slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={restaurantData.slug} />
        <Title title={restaurantData.name} />
        <Ratings reviews={restaurantData.Review} />
        <Description desc={restaurantData.description} />
        <Images img={restaurantData.images} />
        <Reviews reviews={restaurantData.Review} />
      </div>
      <div className="mt-14 text-reg">
        <Reservation
          openTime={restaurantData.open_time}
          closeTime={restaurantData.close_time}
          slug={restaurantData.slug}
        />
      </div>
    </>
  );
}
