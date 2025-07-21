import React from 'react';

interface FlagProps {
  country: 'vi' | 'en';
  className?: string;
}

const Flag: React.FC<FlagProps> = ({ country, className = 'w-6 h-4' }) => {
  if (country === 'vi') {
    return (
      <div className={`${className} bg-red-600 relative overflow-hidden rounded-sm`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-2 h-2 md:w-3 md:h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>
    );
  }

  // Flag: USA
  const stripes = Array(13).fill(0);
  const starRows = 9;
  const starsPerRow = (row: number) => (row % 2 === 0 ? 6 : 5);

  return (
    <div className={`${className} relative border border-black overflow-hidden rounded-sm`}>
      {/* 13 stripes */}
      <div className="absolute inset-0 flex flex-col">
        {stripes.map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? 'bg-red-600' : 'bg-white'}`}
          />
        ))}
      </div>

      {/* Blue canton with stars */}
      <div className="absolute top-0 left-0 w-[40%] h-[53.8%] bg-blue-800 flex flex-col justify-evenly py-[1px] px-[2px]">
        {Array.from({ length: starRows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex ${
              rowIndex % 2 === 0 ? 'justify-between' : 'justify-around'
            } text-white text-[2px] md:text-[3px] leading-none font-bold`}
          >
            {Array.from({ length: starsPerRow(rowIndex) }).map((_, starIndex) => (
              <span key={starIndex}>★</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flag;
