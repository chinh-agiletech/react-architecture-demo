"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';

type OptionType = {
  value: string;
  label: string;
  customColor?: string;
};

interface DropdownProps {
  options: OptionType[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  hideIcon?: boolean;
  placeholder?: string;
  label?: string
}

const Dropdown = ({ options, selectedValue = "", onSelect, hideIcon = false, placeholder, label }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation('common');

  // Find the selected option for display
  const selectedOption = options.find((option) => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : (placeholder || "Chọn một tùy chọn");

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-center items-center gap-2 py-2 rounded-full cursor-pointer"
      >
        <div>
          <p className="text-[#405f2d] text-base transition-colors">
            {displayText}
          </p>
        </div>
      </button>

      {open && (
        <div className="absolute z-10 shadow-lg bg-[#fff] ring-1 ring-black/5 px-6 py-6 animate-fade-in-up rounded-lg transition-colors">
          <div className="flex flex-col">
            <p className="text-[#405f2d] text-base transition-colors pl-2">
              {label}
            </p>
            <div className="flex py-2">
            {options.map((option) => {
              const isSelected = selectedValue === option.value;
              const hasCustomColor = option.customColor;
              
              let buttonClass = `px-4 py-2 rounded-full border border-[#171717] text-base transition-colors text-center cursor-pointer whitespace-nowrap ml-2`;
              let customStyle = {};
              
              if (hasCustomColor && option.customColor === 'purple') {
                // Purple color styling for Xcell
                if (isSelected) {
                  buttonClass += ` border-purple-300`;
                  customStyle = {
                    backgroundColor: '#f3e8ff', // purple-100
                    color: '#6b21a8' // purple-800
                  };
                } else {
                  buttonClass += ` border-purple-200 hover:border-purple-300`;
                  customStyle = {
                    color: '#7c3aed', // purple-700
                  };
                }
              } else {
                // Default styling with black border for Xcellent and Xhome
                if (isSelected) {
                  buttonClass += ` bg-green-100 text-[#405f2d] border-[#171717]`;
                } else {
                  buttonClass += `text-[#405f2d] hover:bg-[#E3EFD8] border-[#171717] ml-2`;
                }
              }
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={buttonClass}
                  style={customStyle}
                  onMouseEnter={hasCustomColor && option.customColor === 'purple' && !isSelected ? 
                    (e) => {
                      e.currentTarget.style.backgroundColor = '#f3e8ff'; // purple-100 on hover
                      e.currentTarget.style.color = '#6b21a8'; // purple-800 on hover
                    } : undefined
                  }
                  onMouseLeave={hasCustomColor && option.customColor === 'purple' && !isSelected ?
                    (e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.color = '#7c3aed'; // purple-700
                    } : undefined
                  }
                >
                  {option.label}
                </button>
              );
            })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
