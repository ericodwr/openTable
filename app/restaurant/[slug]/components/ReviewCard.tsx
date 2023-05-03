import { Review } from '@prisma/client';
import Stars from '../../../components/Stars';

const ReviewCard = ({ review }: { review: Review }) => {
  const name = `${review.first_name[0]}${review.last_name[0]}`;
  return (
    <div className="border-b pb-7 mb-7">
      <div className="flex">
        {/* person */}
        <div className="w-1/6 flex flex-col items-center">
          <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
            <h2 className="text-white text-2xl">{name}</h2>
          </div>
          <p className="text-center">
            {review.first_name} {review.last_name}
          </p>
        </div>
        {/* person */} {/* stars */}
        <div className="ml-10 w-5/6">
          <div className="flex items-center">
            <div className="flex mr-5">
              <Stars reviews={[]} rating={review.rating} />
            </div>
          </div>
        </div>
        {/* stars */}
        <div className="mt-5">
          <p className="text-light font-light">{review.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
