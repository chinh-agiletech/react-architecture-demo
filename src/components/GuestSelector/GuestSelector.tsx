"use client";

import { useEffect, useRef, useState } from "react";
import { FaBed } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');

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
        className="cursor-pointer flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <FaBed className="text-gray-600 w-4 h-4 flex-shrink-0" />
        <div>
          <p className="text-xs text-[#6d6d6d]">{t('guests')}</p>
          <p className="font-semibold text-[#405f2d] text-sm truncate whitespace-nowrap">
            {adults} {t('adults')} • {children} {t('children')}
          </p>
        </div>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 bg-white shadow-lg rounded-xl p-4 w-72">
          {/* Adults */}
          <div className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-medium">{t('adultLabel')}</p>
              <p className="text-sm text-gray-500">{t('adultDescription')}</p>
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

          {/* Children */}
          <div className="flex justify-between items-center pt-4">
            <div>
              <p className="font-medium">{t('childrenLabel')}</p>
              <p className="text-sm text-gray-500">{t('childrenDescription')}</p>
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
