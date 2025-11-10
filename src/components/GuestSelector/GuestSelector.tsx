"use client";

import { useEffect, useRef, useState } from "react";
import { FaBed } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");

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
    const newChildren =
      type === "children" ? Math.max(0, children + delta) : children;
    onChange(newAdults, newChildren);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="cursor-pointer flex items-center gap-[12px]"
        onClick={() => setOpen(!open)}
      >
        <FaBed className="text-gray-600 w-6 h-6 flex-shrink-0 transition-colors" />
        <div>
          <p className="text-sm text-[#6d6d6d] transition-colors">
            {t("guests")}
          </p>
          <p className="font-semibold text-md truncate whitespace-nowrap transition-colors">
            {adults} {t("adults")} • {children} {t("children")}
          </p>
        </div>
      </div>

      {open && (
        <div className="absolute z-50 bg-white shadow-lg rounded-xl min-w-[360px] transition-colors p-[24px]">
          {/* Adults */}
          <div className="flex justify-between items-center border-b border-gray-200 py-2 w-full">
            <div>
              <p className="font-medium transition-colors text-sm">
                {t("adultLabel")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                {t("adultDescription")}
              </p>
            </div>
            <div className="flex items-center gap-[16px]">
              <button
                onClick={() => updateGuests("adults", -1)}
                className="size-[32px] rounded-full border border-gray-300 text-lg flex items-center justify-center  hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="transition-colors text-[24px] text-[#405f2d]">
                {adults}
              </span>
              <button
                onClick={() => updateGuests("adults", 1)}
                className="w-8 h-8 rounded-full border border-gray-300 text-lg flex items-center justify-center  hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center pt-4">
            <div>
              <p className="font-medium transition-colors text-sm">
                {t("childrenLabel")}
              </p>
              <p className="text-sm text-gray-500 transition-colors">
                {t("childrenDescription")}
              </p>
            </div>
            <div className="flex items-center gap-[16px] text-[#405f2d]">
              <button
                onClick={() => updateGuests("children", -1)}
                className="size-[32px] rounded-full border border-gray-300 text-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="transition-colors text-[24px]">{children}</span>
              <button
                onClick={() => updateGuests("children", 1)}
                className="size-[32px] rounded-full border border-gray-300 text-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
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
