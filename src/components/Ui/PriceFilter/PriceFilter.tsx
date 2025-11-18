import React from "react";

interface PriceFilterProps {
  title?: string;

  priceFrom: number;
  priceTo: number;
  setPriceFrom: (value: number) => void;
  setPriceTo: (value: number) => void;

  min?: number;
  max?: number;
  step?: number;
  currency?: string;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  title = "Filter by price",
  priceFrom,
  priceTo,
  setPriceFrom,
  setPriceTo,
  min = 0,
  max = 2000000,
  step = 50000,
  currency = "đ",
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-[#405f2d]">{title}</h3>

      <div className="space-y-4">
        <div>
          {/* Slider */}
          <input
            type="range"
            className="w-full accent-[#759d3f] mb-4"
            min={min}
            max={max}
            step={step}
            value={priceTo}
            onChange={(e) => setPriceTo(Number(e.target.value))}
          />

          {/* From - To Inputs */}
          <div className="flex justify-between gap-4">
            {/* From */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-gray-700">Từ</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full p-2 border rounded pr-8"
                  placeholder="Giá"
                  min={min}
                  max={priceTo}
                  value={priceFrom}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= priceTo) setPriceFrom(value);
                  }}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 font-bold">
                  {currency}
                </span>
              </div>
            </div>

            {/* To */}
            <div className="flex-1">
              <label className="block text-sm mb-2 text-gray-700">Đến</label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full p-2 border rounded pr-8"
                  placeholder="Giá"
                  min={priceFrom}
                  max={max}
                  value={priceTo}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= priceFrom) setPriceTo(value);
                  }}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 font-bold">
                  {currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
