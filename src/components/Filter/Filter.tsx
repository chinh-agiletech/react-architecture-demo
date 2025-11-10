"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Dropdown from "../Dropdown/Dropdown";
import CustomCalendar from "../Ui/CustomCalendar/CustomCalendar";
import GuestSelector from "../GuestSelector/GuestSelector";

const Filter = () => {
  const { t } = useTranslation("common");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Mock data for selectors
  const locationOptions = [{ value: "thainguyen", label: "Thái Nguyên" }];

  const brandOptions = [
    { value: "XCELLENT", label: "Xcellent" },
    { value: "XHOME", label: "Xhome" },
    { value: "XCELL", label: "Xcell", customColor: "purple" },
  ];

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between flex-wrap lg:flex-nowrap px-[100px] py-[32px] gap-[16px] mx-auto w-full  max-w-[1440px] sm:gap-x-[20px] sm:gap-y-[30px] p-[24px]">
        <div className="flex w-full sm:gap-x-[20px] sm:gap-y-[30px]  flex-wrap items-center">
          <div className="flex max-w-[344px] sm:w-auto items-center gap-[12px] cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8">
              <Image
                src="/logo/globe.svg"
                alt="Location icon"
                width={24}
                height={24}
              />
            </div>
            <Dropdown
              options={locationOptions}
              selectedValue={selectedLocation}
              onSelect={(value) => setSelectedLocation(value)}
              placeholder="Where is next ?"
              label="Tỉnh / Thành phố"
            />
          </div>
          <hr className="w-full h-px bg-[#171717] border-0 sm:w-px sm:h-10" />
          <div className="flex items-center gap-[4px]">
            <div className="flex items-center justify-center w-8 h-8">
              <Image
                src="/logo/branch-logo-black.svg"
                alt="Branch logo"
                width={24}
                height={24}
              />
            </div>
            <Dropdown
              options={brandOptions}
              selectedValue={selectedBrand}
              onSelect={(value) => setSelectedBrand(value)}
              hideIcon={true}
              placeholder="Choose brand"
              label="Thương hiệu"
              className='text-[14px]'
            />
          </div>
          <hr className="w-full h-px bg-[#171717] border-0 sm:w-px sm:h-10" />
          <div className="flex justify-between items-center">
            <CustomCalendar
              startDate={checkInDate}
              endDate={checkOutDate}
              onChange={(start, end) => {
                setCheckInDate(start);
                setCheckOutDate(end);
              }}
              startLabel={t("checkInDate")}
              endLabel={t("checkOutDate")}
              singleCalendar={false} // Sử dụng hai calendar song song với khả năng kéo chọn khoảng thời gian
            />
          </div>
          <hr className="w-full h-px bg-[#171717] border-0 sm:w-px sm:h-10" />
          <div className="flex items-center min-w-[200px]">
            <GuestSelector
              adults={adults}
              children={children}
              onChange={(newAdults, newChildren) => {
                setAdults(newAdults);
                setChildren(newChildren);
              }}
            />
          </div>
        </div>

        <button className="w-[144px] max-sm:w-full max-sm:mt-[24px] medium bg-[#405f2d] border border-[#405f2d] text-[#f6f6f6] rounded-[30px] cursor-pointer relative m-1">
          <div className="px-[12px] py-[7px]">{t("searchRooms")}</div>
        </button>
      </div>
    </div>
  );
};

export default Filter;
