import { Price } from '@prisma/client';

const PriceComp = ({ price }: { price: Price }) => {
  const renderPrice = () => {
    switch (price) {
      case Price.CHEAP:
        return (
          <>
            <span>$$</span> <span className="text-gray-400">$$</span>
          </>
        );
      case Price.REGULAR:
        return (
          <>
            <span>$$$</span> <span className="text-gray-400">$</span>
          </>
        );
      case Price.EXPENSIVE:
        return (
          <>
            <span>$$$$</span>
          </>
        );
      default:
        break;
    }
  };

  return <p className="flex mr-3">{renderPrice()}</p>;
};

export default PriceComp;
