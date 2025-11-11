"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import React from "react";
import SelectComponent from "../Ui/SelectCustom/SelectCustom";
import Flag from "../Flag/Flag";
import SwitchLanguage from "../SwitchLanguae/SwitchLanguae";

function Header() {
  const { t, i18n } = useTranslation("common");
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "vi");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Set initial language from localStorage if available
  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang && storedLang !== currentLanguage) {
      setCurrentLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    }
  }, [currentLanguage, i18n]);

  const handleLanguageChange = (value: string | number) => {
    const locale = value as string;
    localStorage.setItem("language", locale);
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full min-h-[134px] bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row - Language selector and Account link - Hidden on mobile */}
        <div className="hidden md:flex justify-end items-center py-2">
          <div className="flex items-center space-x-4">
            <SwitchLanguage />
            <Link
              href="/account"
              className="text-[#405f2d] hover:text-[#5a8941] transition-colors text-sm font-medium"
            >
              {t("account")}
            </Link>
          </div>
        </div>

        {/* Main navigation row */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo_new.webp"
              alt="X Hotel Logo"
              width={150}
              height={30}
              className="object-contain h-8 sm:h-9 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/member"
              className="text-[#1d1d1d] hover:text-[#5a8941] transition-colors text-md"
            >
              {t("xMember")}
            </Link>
            <Link
              href="/long-stay"
              className="text-[#1d1d1d] hover:text-[#5a8941] transition-colors text-md"
            >
              {t("longStay")}
            </Link>
            <Link
              href="/about"
              className="text-[#1d1d1d] hover:text-[#5a8941] transition-colors text-md"
            >
              {t("aboutXHotel")}
            </Link>
            <Link
              href="/cart"
              className="flex items-center justify-center h-10 w-10 cursor-pointer text-[#1d1d1d] transition-all"
            >
              <svg
                className="w-10 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </Link>
          </nav>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/cart"
              className="flex items-center justify-center h-10 w-10 cursor-pointer text-[#1d1d1d] transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center h-10 w-10 text-[#1d1d1d] transition-all"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        >
          <div
            className="fixed inset-y-0 right-0 w-full bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out"
            style={{
              animation: "slideInLeft 0.3s ease-out forwards",
            }}
          >
            <style jsx>{`
              @keyframes slideInLeft {
                from {
                  transform: translateX(-100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
            `}</style>
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo/logo_new.webp"
                  alt="X Hotel Logo"
                  width={150}
                  height={30}
                  className="object-contain h-8 sm:h-9 md:h-10 w-auto"
                />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="flex items-center justify-center h-8 w-8 text-[#1d1d1d]"
                aria-label="Close mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile menu content */}
            <div className="flex h-full p-4">
              {/* User Section */}
              <div className="text-center flex-1">
                <h3 className="text-xl font-semibold text-[#1d1d1d] mb-2">
                  {t("xMember")}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{t("longStay")}</p>
                <p className="text-gray-600 text-sm mb-6">{t("aboutXHotel")}</p>
                <Link
                  href="/search"
                  onClick={toggleMobileMenu}
                  className="w-full bg-[#405f2d] hover:bg-[#5a8941] text-white py-3 px-6 rounded-full transition-colors font-medium"
                >
                  {t("searchRooms") || "Tìm phòng"}
                </Link>
              </div>

              {/* Language Selector - Moved to bottom and reduced width */}
              <div className="">
                <div className="">
                  <Flag country={currentLanguage === "vi" ? "vi" : "en"} />
                  <SelectComponent
                    options={[
                      { value: "vi", label: t("vietnamese") },
                      { value: "en", label: t("english") },
                    ]}
                    defaultValue={currentLanguage}
                    onChange={handleLanguageChange}
                    className="w-[200px] text-md"
                    isLanguage={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
