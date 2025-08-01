import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  brand_type,
}) => {
  // Initialize i18n
  const { t } = useTranslation();

  // Determine if this is an XCELL brand room
  const isXcellBrand = brand_type === 'XCELL';
  
  // Define colors based on brand type
  const locationColor = isXcellBrand ? '#9f4fa8' : '#759d3f';
  const amenityBgColor = isXcellBrand ? '#f5f0f8' : '#F5F9EC';
  const amenityTextColor = isXcellBrand ? '#9f4fa8' : '#759d3f';
  const priceColor = isXcellBrand ? '#9f4fa8' : '#759d3f';
  const buttonBgColor = isXcellBrand ? '#9f4fa8' : '#759d3f';

  return (
    <div className="room-card border border-none rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
      {/* Room Image */}
      <div className="w-full md:w-2/5 relative h-48 md:h-auto">
        <Image
          src={image}
          alt={`${name} Room`}
          fill
          className="object-cover"
        />
      </div>

      {/* Room Details */}
      <div className="w-full md:w-3/5 p-5 md:pt-10 bg-[var(--background)] flex flex-col">
        {/* Mobile: Title first */}
        <div className="block md:hidden mb-4">
          <h3 className="text-xl font-bold text-[#171717]">{name}</h3>
          <p style={{ color: locationColor }}>{location}</p>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex md:flex-row h-full">
          {/* Left column - Room details and amenities */}
          <div className="w-full md:w-2/3 pr-0 md:pr-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{name}</h3>
                <p style={{ color: locationColor }}>{location}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-4 my-4">
              {amenities.slice(0, 4).map((amenity, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 px-3 py-2 rounded-[50px]"
                  style={{ backgroundColor: amenityBgColor }}
                >
                  <span style={{ color: amenityTextColor }}>
                    <Image 
                      src={amenity.icon} 
                      alt={amenity.name}
                      width={20}
                      height={20}
                      className=""
                    />
                  </span>
                  <span 
                    className="text-md whitespace-nowrap"
                    style={{ color: amenityTextColor }}
                  >
                    {amenity.name}
                  </span>
                </div>
              ))}
              {amenities.length > 4 && (
                <div className="flex items-center gap-1">
                  <span style={{ color: amenityTextColor }}>+{amenities.length - 4}</span>
                </div>
              )}
            </div>
          </div>
          {/* Right column - Price information */}
          <div className="w-full md:w-1/3 flex flex-col justify-end md:items-end border-l border-[#e7e7e7] pl-4 md:-mt-10 md:pt-10 md:-mb-5 md:pb-5">
            <div className="md:text-right">
              <p className="text-md">{t('startingFrom')}</p>
              <p className="text-2xl font-semibold" style={{ color: priceColor }}>
                {price ? price.format.replace(/\s*VND\s*/g, '') : '0'}
              </p>
              <p className="text-sm">{currency}/{t('perNight')}</p>
              <p className="text-xs text-gray-500 min-w-[160px]">{t('taxesIncluded')}</p>
            </div>

            <div className="mt-4">
              <Link href={detailUrl}>
                <button 
                  className="hover:opacity-90 text-white px-6 py-2 rounded-full text-sm transition-colors min-w-[100px]"
                  style={{ backgroundColor: buttonBgColor }}
                >
                  {t('viewRoom')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: Amenities in middle */}
        <div className="block md:hidden mb-4">
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 4).map((amenity, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-3 py-1 rounded-[50px]"
                style={{ backgroundColor: amenityBgColor }}
              >
                <span style={{ color: amenityTextColor }}>
                  <Image 
                    src={amenity.icon} 
                    alt={amenity.name}
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                </span>
                <span 
                  className="text-sm whitespace-nowrap"
                  style={{ color: amenityTextColor }}
                >
                  {amenity.name}
                </span>
              </div>
            ))}
            {amenities.length > 4 && (
              <div className="flex items-center gap-1">
                <span style={{ color: amenityTextColor }}>+{amenities.length - 4}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Price and button at bottom */}
        <div className="block md:hidden">
          <div className="flex flex-col">
            <div>
              <p className="text-sm">{t('startingFrom')}</p>
              <p className="text-xl font-semibold" style={{ color: priceColor }}>
                {price ? price.format.replace(/\s*VND\s*/g, '') : '0'}
              </p>
              <p className="text-xs">{currency}/{t('perNight')}</p>
              <p className="text-xs text-gray-500">{t('taxesIncluded')}</p>
            </div>

            <div>
              <Link href={detailUrl}>
                <button 
                  className="hover:opacity-90 text-white px-4 py-2 rounded-full text-sm w-full mt-4 transition-colors"
                  style={{ backgroundColor: buttonBgColor }}
                >
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
