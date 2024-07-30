// src/components/Pantry/PantryList.tsx
import Image from 'next/image';
import React from 'react';

interface Item {
  id: string;
  name: string;
  quantity: number;
  image?: string;
}

interface PantryListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const PantryList: React.FC<PantryListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
          <div>
            {item.image && <Image src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />}
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
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
