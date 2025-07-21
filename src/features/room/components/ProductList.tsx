import SelectComponent from '../../../components/SelectCustom/SelectCustom';
import RoomCard from './RoomCard';
import { useState } from 'react';
import { rooms } from '../data/room';

const ProductList = () => {
    
  // Price filter state
  const [selectedPrice, setSelectedPrice] = useState(500000);
  
  // Price options
  const priceOptions = [
    { value: 500000, label: '500K' },
    { value: 650000, label: '650K' },
    { value: 800000, label: '800K' },
    { value: 950000, label: '950K' },
  ];
  
  // Handle price filter change
  const handlePriceChange = (price: number) => {
    setSelectedPrice(price);
    console.log('Price filter:', price);
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-8/12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{rooms.length}</span>
            <h2 className="text-xl font-semibold">Suitable choices</h2>
          </div>
          <div className="flex items-center gap-2">
            <SelectComponent 
              options={[
                { value: 'default', label: 'Default' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' }
              ]} 
              defaultValue="default"
              onChange={(value) => console.log('Sorting by:', value)}
              className="border border-none"
            />
          </div>
        </div>
        
        {/* Product List */}
        <div className="grid grid-cols-1 gap-6">
          {rooms.map(room => (
            <RoomCard 
              key={room.id}
              id={room.id}
              name={room.name}
              location={room.location}
              image={room.image}
              price={room.price}
              amenities={room.amenities}
            />
          ))}
        </div>
      </div>
      
      {/* Right Column - Price Filter */}
      <div className="w-full md:w-4/12">
        <div className="rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Filter by price</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Price range</label>
              <input 
                type="range" 
                className="w-full" 
                min="0" 
                max="1000000" 
                step="50000"
                value={selectedPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
              />
              <div className="flex justify-between mt-1">
                <span>0</span>
                <span>1,000,000₫</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm mb-1">Select price</label>
              {priceOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`price-${option.value}`}
                    name="price-option"
                    className="mr-2"
                    checked={selectedPrice === option.value}
                    onChange={() => handlePriceChange(option.value)}
                  />
                  <label htmlFor={`price-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
