import { PrismaClient } from '@prisma/client';
import Header from './components/Header';
import ReserveForm from './components/ReserveForm';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

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

export async function generateMetadata({ params }: any): Promise<any> {
  const data = await fetchTitle(params.slug);

  if (data) {
    return {
      title: `Reserve at ${data}`,
    };
  } else {
    return {
      title: 'wrong credentials',
    };
  }
}

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });
  if (!restaurant) {
    notFound();
  }
  return restaurant;
};

export default async function Reserve({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          images={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />

        {/* form */}
        <ReserveForm
          date={searchParams.date}
          partySize={searchParams.partySize}
          slug={params.slug}
        />
        {/* form */}
      </div>
    </div>
  );
}
