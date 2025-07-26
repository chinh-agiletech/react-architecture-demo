'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#454545] text-white py-12 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <img
                src="/logo/logo_new.webp"
                alt="X Hotel"
                width={180}
                height={40}
                className="mr-2"
              />
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" passHref>
                <div className="hover:opacity-75">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </div>
              </Link>
              <Link href="https://instagram.com" passHref>
                <div className="hover:opacity-75">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </Link>
              <Link href="https://tiktok.com" passHref>
                <div className="hover:opacity-75">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.59-1.16-2.59-2.5 0-1.34 1.16-2.5 2.59-2.5.27 0 .51.04.75.13v-3.31c-.24-.03-.47-.07-.75-.07-2.76 0-5 2.24-5 5s2.24 5 5 5c2.76 0 5-2.24 5-5V8.13h2.67c.35 1.27-.03 2-.03 2" />
                  </svg>
                </div>
              </Link>
              <Link href="https://youtube.com" passHref>
                <div className="hover:opacity-75">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
              </Link>
            </div>

            <p className="text-sm">&copy; {currentYear} X Hotel</p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase">{t('footer.companyInfo')}</h3>
            <div className="flex flex-col space-y-3">
              <div className="text-sm">
                <h4 className="font-medium">{t('footer.companyName')}</h4>
                <p>{t('footer.companyFullName', {default: 'CÔNG TY CỔ PHẦN ĐT & QL TÀI SẢN PCLAND'})}</p>
              </div>
              <Link href="/member" className="text-sm hover:underline">
                {t('footer.aboutXHotelMember', {default: 'Về X Hotel Member'})}
              </Link>
              <Link href="/about" className="text-sm hover:underline">
                {t('footer.aboutXHotel', {default: 'Về X Hotel'})}
              </Link>
              <Link href="/news" className="text-sm hover:underline">
                {t('footer.news', {default: 'X News'})}
              </Link>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase">{t('footer.support', {default: 'Hỗ trợ'})}</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/terms" className="text-sm hover:underline">
                {t('footer.terms', {default: 'Chính sách và điều khoản'})}
              </Link>
              <Link href="/general-rules" className="text-sm hover:underline">
                {t('footer.generalRules', {default: 'Quy định chung'})}
              </Link>
              <Link href="/privacy-policy" className="text-sm hover:underline">
                {t('footer.privacyPolicy', {default: 'Chính sách bảo mật'})}
              </Link>
              <Link href="/booking-policy" className="text-sm hover:underline">
                {t('footer.bookingPolicy', {default: 'Chính sách giao và nhận phòng'})}
              </Link>
              <Link href="/cancellation-policy" className="text-sm hover:underline">
                {t('footer.cancellationPolicy', {default: 'Chính sách đổi, trả phòng và hoàn tiền'})}
              </Link>
              <Link href="/faq" className="text-sm hover:underline">
                {t('footer.faq', {default: 'FAQ'})}
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase">{t('footer.contact', {default: 'Liên hệ'})}</h3>
            <div className="flex flex-col space-y-3">
              <div className="text-sm">
                <h4 className="font-medium">{t('footer.companyFullName', {default: 'CÔNG TY CỔ PHẦN ĐT & QL TÀI SẢN PCLAND'})}</h4>
                <p className="mt-2">{t('footer.businessRegistration', {default: 'GPKD số 0107870863, ngày cấp 01-06-2017, nơi cấp SỞ KẾ HOẠCH VÀ ĐẦU TƯ THÀNH PHỐ HÀ NỘI'})}</p>
              </div>
              <p className="text-sm">
                {t('footer.address', {default: 'Địa chỉ: Xã Tây Phương, Hà Nội'})}
              </p>
              <p className="text-sm">
                {t('footer.email', {default: 'Email'})}: <a href="mailto:info@xhotel.vn" className="hover:underline">info@xhotel.vn</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
