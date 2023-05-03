import Link from 'next/link';
import PriceComp from '../../components/PriceComp';
import { Cuisine, Location, Price, Review } from '@prisma/client';
import Image from 'next/image';
import { calculateReviewRatingAverage } from '../../../utils/calculateReviewRatingAverate';
import Stars from '../../components/Stars';

interface restaurantType {
  main_image: string;
  name: string;
  price: Price;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  id: number;
  Review: Review[];
}

const RestaurantCard = ({ restaurant }: { restaurant: restaurantType }) => {
  const rating = calculateReviewRatingAverage(restaurant.Review);

  const ratingText = () => {
    if (rating > 4) return 'Awesome';
    else if (rating <= 4 && rating > 3) return 'Good';
    else if (rating <= 3 && rating > 0) return 'Average';
    else '';
  };

  return (
    <div className="border-b ml-5 flex pb-5">
      {/* <Link href={'/restxaurant/uko'}> */}
      <Image
        src={`${restaurant.main_image}`}
        alt={restaurant.name}
        width={1000}
        height={1000}
        className="w-44 rounded"
      />

      {/* title */}
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.Review} />
          </div>
          <p className="ml-2 text-sm">{ratingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <PriceComp price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
      {/* title */}
      {/* </Link> */}
    </div>
  );
};

export default RestaurantCard;
