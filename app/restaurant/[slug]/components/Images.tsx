import Image from 'next/image';

const Images = ({ img }: { img: string[] }) => {
  return (
    <div>
      <h1 className=' className="font-bold text-3xl mt-10 mb-7 border-b pb-5"'>
        {img.length} photos
      </h1>
      <div className="flex flex-wrap">
        {img.map((url, i) => (
          <Image
            key={i}
            className="w-56 h-44 mr-1 mb-1"
            src={`${url}`}
            alt={`${i}`}
            width={1000}
            height={1000}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
