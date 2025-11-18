import React, { useState, useEffect, useRef } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectComponentProps {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
  value?: string | number;
  disabled?: boolean;
  className?: string;
  isLanguage?: boolean;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  placeholder,
  onChange,
  value,
  defaultValue,
  disabled = false,
  className = "",
  isLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The logic to set the selected option based on value or defaultValue is commented out.
    // if (value) {
    //     const option = options.find(opt => opt.value === value);
    //     if (option) {
    //         setSelectedOption(option);
    //     }
    // }
    // else if (defaultValue) {
    //     const option = options.find(opt => opt.value === defaultValue);
    //     if (option) {
    //         setSelectedOption(option);
    //     }
    // }
    // else if (options.length > 0) {
    //     setSelectedOption(options[0]);
    // }

    let newSelected = null;

    if (value) {
      newSelected = options.find((opt) => opt.value === value);
    } else if (defaultValue) {
      newSelected = options.find((opt) => opt.value === defaultValue);
    }

    if (!newSelected && options.length > 0) {
      newSelected = options[0];
    }

    if (newSelected) {
      setSelectedOption(newSelected);
    }
  }, [value, defaultValue, options]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <div ref={selectRef} className={`relative w-full ${className}`}>
      <div
        className={`flex flex-col items-center bg-white rounded-[8px] border-[#f6f6f6]
                    justify-between px-[16px] py-[14px] cursor-pointer hover:text-[#5a8941] transition-colors ${
                      disabled ? "opacity-60 cursor-not-allowed" : ""
                    }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`${isLanguage ? "hidden" : "block"}`}>Sort by</span>
        <div className="flex items-center gap-1">
          <div className="truncate text-lg font-medium text-[#759d3f]">
            {selectedOption ? selectedOption.label : placeholder}
          </div>
          <div
            className={`transition-transform ml-1 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-3 h-3 text-[#759d3f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute w-[220px] bg-white mt-1 rounded-md shadow-lg left-[-100px] z-10 p-[16px] flex flex-col gap-[4px]">
          {options.map((option, index) => (
            <div
              key={index}
              className={` cursor-pointer hover:bg-[#f5f8f3] transition-colors text-lg p-[8px] rounded-[8px] ${
                selectedOption?.value === option.value
                  ? "bg-[#e8f0e3] text-[#405f2d] font-medium"
                  : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <span className="text-[20px] font-600">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
