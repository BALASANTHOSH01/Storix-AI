// src/components/Inventory/InventoryList.tsx
import Image from 'next/image';
import React from 'react';

interface Item {
  id: string;
  name: string;
  quantity: number;
  image?: string;
}

interface InventoryListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p>No inventory items found.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
            <div className="flex items-center space-x-4">
              {item.image && <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover rounded-md" />}
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default InventoryList;
