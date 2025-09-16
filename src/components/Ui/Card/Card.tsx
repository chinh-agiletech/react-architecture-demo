import React from "react";

interface CardProps {
  title?: string;
  address?: string;
  image?: {
    src?: string;
    alt?: string;
  };
  price?: number;
  currency?: string;
  features?: string[]; // tiện ích
}

const Card: React.FC<CardProps> = ({
  title,
  address,
  image,
  price,
  currency = "₫",
  features = [],
}) => {
  return (
    <div className="flex w-full border rounded-lg overflow-hidden shadow-md bg-white">
      {/* Cột trái (3/12) - Ảnh */}
      <div className="w-3/12">
        {image?.src && (
          <img
            src={image.src}
            alt={image.alt || title}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Cột giữa (6/12) - Thông tin */}
      <div className="w-6/12 p-4 flex flex-col justify-between">
        <div>
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {address && (
            <p className="text-sm text-purple-600 font-medium">{address}</p>
          )}
        </div>

        {/* Tiện ích */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {features.map((feature, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full flex items-center gap-1"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Cột phải (3/12) - Giá + nút */}
      <div className="w-3/12 p-4 border-l flex flex-col justify-center items-center text-center">
        <p className="text-xs text-gray-500">ONLY FROM</p>
        <p className="text-2xl font-bold text-purple-700">
          {price?.toLocaleString()} {currency}
        </p>
        <p className="text-xs text-gray-500">Đồng/per night</p>
        <p className="text-xs text-gray-400">Taxes and fees included</p>

        <button className="mt-3 px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
          View room
        </button>
      </div>
    </div>
  );
};

export default Card;
