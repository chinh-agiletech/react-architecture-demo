import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RoomCardProps } from "../type";
import { useTranslation } from "react-i18next";

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  location,
  image,
  price,
  currency = "Đồng",
  amenities,
  detailUrl = `/product/${id}`,
  brand_type,
}) => {
  // Initialize i18n
  const { t } = useTranslation();

  // Determine if this is an XCELL brand room
  const isXcellBrand = brand_type === "XCELL";

  // Define colors based on brand type
  const locationColor = isXcellBrand ? "#9f4fa8" : "#759d3f";
  const amenityBgColor = isXcellBrand ? "#f5f0f8" : "#F5F9EC";
  const amenityTextColor = isXcellBrand ? "#9f4fa8" : "#759d3f";
  const priceColor = isXcellBrand ? "#9f4fa8" : "#759d3f";
  const buttonBgColor = isXcellBrand ? "#9f4fa8" : "#759d3f";

  return (
    <div className="room-card border border-none rounded-[12px] overflow-hidden shadow-md flex flex-col md:grid md:grid-cols-[375px_375px_160px]">
      {/* Room Image */}
      <div className="w-full min-h-[258px] relative ">
        <Image src={image} alt={`${name} Room`} fill className="object-cover" />
      </div>

      <div className="w-full p-5 bg-[var(--background)] flex">
        <div className="block md:hidden mb-4">
          <h3 className="text-xl font-bold text-[#171717]">{name}</h3>
          <p style={{ color: locationColor }}>{location}</p>
        </div>

        <div className="">
          <div>
            <h3 className="text-xl font-bold text-[#171717]">{name}</h3>
            <p style={{ color: locationColor }}>{location}</p>
          </div>

          <div className="max-w-[250px] grid grid-cols-[120px_120px] items-center mt-6 ml-2  gap-[10px] overflow-hidden h-auto">
            {amenities.slice(0, 4).map((amenity, index) => (
              <div
                key={index}
                className="flex w-full items-center gap-2 py-2 rounded-[50px] justify-center"
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
                  className="text-md whitespace-nowrap overflow-hidden text-ellipsis w-[80px]"
                  style={{ color: amenityTextColor }}
                >
                  {amenity.name}
                </span>
              </div>
            ))}
            {amenities.length > 4 && (
              <div className="flex items-center gap-1">
                <span style={{ color: amenityTextColor }}>
                  +{amenities.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-end border-l border-[#e7e7e7] px-4">
        <div className="md:text-right">
          <p className="text-md">{t("startingFrom")}</p>
          <p className="text-2xl font-semibold" style={{ color: priceColor }}>
            {price ? price.format.replace(/\s*VND\s*/g, "") : "0"}
          </p>
          <p className="text-sm">
            {currency}/{t("perNight")}
          </p>
          <p className="text-xs text-gray-500 min-w-[160px]">
            {t("taxesIncluded")}
          </p>
        </div>

        <div className="mt-4">
          <Link href={detailUrl}>
            <button
              className="hover:opacity-90 text-white px-6 py-2 rounded-full text-sm transition-colors min-w-[120px]"
              style={{ backgroundColor: buttonBgColor }}
            >
              {t("viewRoom")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
