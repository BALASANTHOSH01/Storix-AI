import Image from 'next/image';
import React from 'react';

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string; // Added category field
  image?: string;
}

interface PantryListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const PantryList: React.FC<PantryListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <div className=" flex gap-6 flex-wrap">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col items-start justify-center p-8 border border-slate-500 rounded-md shadow-sm">
          <p className="text-sm py-1 px-3 rounded-full text-darkmode mb-2 bg-gradient-to-r from-green-400 to-green-600">{item.category}</p>
          <div className="flex flex-col items-start">
            {item.image ? (
              
              <Image 
                src={item.image} 
                alt={item.name} 
                width={64} 
                height={64} 
                className="w-[200px] h-64 object-cover rounded-md" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/path/to/default/image.png'; // Fallback image
                }}
              />
            ) : (
              <div className="w-[200px] h-64 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold capitalize py-2">{item.name}</h3>
              <p className="text-sm text-gray-600 py-2">Quantity: {item.quantity}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PantryList;
