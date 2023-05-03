import { Review } from '@prisma/client';
import { calculateReviewRatingAverage } from '../../../../utils/calculateReviewRatingAverate';
import Stars from '../../../components/Stars';

const Ratings = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">
          {calculateReviewRatingAverage(reviews).toFixed(1)}
        </p>
      </div>

      <div className="text-reg ml-4">
        {reviews.length} {reviews.length > 1 ? 'people' : 'person'}
      </div>
    </div>
  );
};

export default Ratings;
