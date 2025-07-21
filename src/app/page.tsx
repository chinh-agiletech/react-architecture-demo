"use client";

import { useTranslation } from 'react-i18next';
import Filter from '../components/Filter/Filter';
import ProductList from '../features/room/components/ProductList';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="mt-10">
        <div className="w-full"> 
          <Filter />
        </div>
        <div className="mt-10 w-[80%] mx-auto">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
