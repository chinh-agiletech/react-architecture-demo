"use client";

import { useEffect, useRef, useState } from "react";
import { FaBed } from "react-icons/fa";

interface GuestSelectorProps {
  adults: number;
  children: number;
  onChange: (adults: number, children: number) => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({
  adults,
  children,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateGuests = (type: "adults" | "children", delta: number) => {
    const newAdults = type === "adults" ? Math.max(1, adults + delta) : adults;
    const newChildren = type === "children" ? Math.max(0, children + delta) : children;
    onChange(newAdults, newChildren);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="cursor-pointer flex items-center gap-2 px-6"
        onClick={() => setOpen(!open)}
      >
        <FaBed className="text-gray-600 w-4 h-4" />
        <p className="font-semibold">
          {adults} Người lớn • {children} Trẻ em
        </p>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 bg-white shadow-lg rounded-xl p-4 w-72">
          {/* Người lớn */}
          <div className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-medium">Người lớn</p>
              <p className="text-sm text-gray-500">Từ 6 tuổi trở lên</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateGuests("adults", -1)}
                className="w-8 h-8 rounded-full border text-lg flex items-center justify-center"
              >
                −
              </button>
              <span>{adults}</span>
              <button
                onClick={() => updateGuests("adults", 1)}
                className="w-8 h-8 rounded-full border text-lg flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Trẻ em */}
          <div className="flex justify-between items-center pt-4">
            <div>
              <p className="font-medium">Trẻ em</p>
              <p className="text-sm text-gray-500">Dưới 6 tuổi</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateGuests("children", -1)}
                className="w-8 h-8 rounded-full border text-lg flex items-center justify-center"
              >
                −
              </button>
              <span>{children}</span>
              <button
                onClick={() => updateGuests("children", 1)}
                className="w-8 h-8 rounded-full border text-lg flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
