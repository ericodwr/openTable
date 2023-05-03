import Link from 'next/link';

import { restaurantCardType } from '../page';
import PriceComp from './PriceComp';
import Stars from './Stars';

interface Props {
  restaurant: restaurantCardType;
}

const Card = ({ restaurant }: Props) => {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img
          src={`${restaurant.main_image}`}
          alt={restaurant.name}
          className="w-full h-36"
        />
        {/* details */}
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">
              <Stars reviews={restaurant.Review} />
            </div>
            <p className="ml-2">
              {restaurant.Review.length}
              {restaurant.Review.length > 1 ? 'Reviews' : 'Review'}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className="mr-3 ">{restaurant.cuisine.name}</p>
            <PriceComp price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold"> Booked 3 times today </p>
        </div>
      </Link>

      {/* details */}
    </div>
  );
};

export default Card;
