import React from 'react';
import Link from 'next/link';
import { RoomCardProps } from '../type';
import { useTranslation } from 'react-i18next';

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  location,
  image,
  price,
  currency = 'VND',
  amenities,
  detailUrl = `/product/${id}`,
}) => {
  // Initialize i18n
  const { t } = useTranslation();

  return (
    <div className="border border-none rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
      {/* Room Image */}
      <div className="w-full md:w-2/5">
        <img
          src={image}
          alt={`${name} Room`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Room Details */}
      <div className="w-full md:w-3/5 p-5">
        <div className="flex flex-col md:flex-row">
          {/* Left column - Room details and amenities */}
          <div className="w-full md:w-2/3 pr-0 md:pr-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-[#759d3f]">{name}</h3>
                <p className="text-[#759d3f]">{location}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-4 my-4">
              {amenities.slice(0, 4).map((amenity, index) => (
                <div key={index} className="flex items-center gap-1 bg-[#F5F9EC] w-[100px] rounded-[50px]">
                  <span className="text-[#759d3f]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={amenity.icon} />
                    </svg>
                  </span>
                  <span>{amenity.name}</span>
                </div>
              ))}
              {amenities.length > 4 && (
                <div className="flex items-center gap-1">
                  <span className="text-[#759d3f]">+{amenities.length - 4}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Price information */}
          <div className="w-full md:w-1/3 mt-4 md:mt-0 flex flex-col items-start md:items-end">
            <div className="md:text-right">
              <p className="text-sm text-gray-600 min-w-[80px]">{t('perNight').toUpperCase()}</p>
              <p className="text-2xl font-semibold text-[#759d3f]">
                {price ? price.format : '0 VND'}
              </p>
              <p className="text-sm">{currency}/{t('perNight')}</p>
              <p className="text-xs text-gray-500 min-w-[160px]">{t('taxesIncluded')}</p>
            </div>

            <div className="mt-4">
              <Link href={detailUrl}>
                <button className="bg-[#759d3f] hover:bg-green-700
                text-white px-6 py-2 rounded-full text-sm transition-colors min-w-[100px]">
                  {t('viewRoom')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
