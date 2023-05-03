import Menu from './components/Menu';
import RestaurantNavbar from '../components/RestaurantNavbar';
import { PrismaClient } from '@prisma/client';

export async function generateMetadata({ params }: any) {
  const data = await fetchItems(params.slug);

  return {
    title: `Menu of ${data.name}`,
  };
}

const prisma = new PrismaClient();

const fetchItems = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
      name: true,
    },
  });

  if (!restaurant) {
    throw Error();
  }

  return restaurant;
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const { items } = await fetchItems(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavbar slug={params.slug} />
      <Menu menu={items} />
    </div>
  );
}
