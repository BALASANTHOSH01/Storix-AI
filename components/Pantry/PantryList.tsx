import Image from 'next/image';
import React from 'react';
import Tooltip from '../Tooltip/ToolTip';

interface Item {
  id?: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  image?: string;
  expirationDate?: string;
  storageLocation?: string;
  notes?: string;
}

interface PantryListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const PantryList: React.FC<PantryListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <div className=" flex gap-6 flex-wrap lg:flex-col items-center">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col items-start justify-center p-8 border border-slate-500 rounded-md shadow-sm  w-[20%] lg:w-[90%]">
          <p className="text-sm py-1 px-3 rounded-full text-darkmode mb-2 bg-gradient-to-r from-green-400 to-green-600">{item.category}</p>
          <div className="flex flex-col items-start z-0">
            {item.image ? (
              <Tooltip title={item.name}>
              <Image 
                src={item.image} 
                alt={item.name} 
                width={64} 
                height={64} 
                className=" w-[600px] h-64 object-cover rounded-md" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/path/to/default/image.png'; // Fallback image
                }}
                />
                </Tooltip>
            ) : (
              <div className="">
                <Tooltip title={'Random Alt Image'}>
                <img src="https://picsum.photos/256/" width={64} 
                height={64} alt='random' className=' w-[600px] h-64 object-cover rounded-md'/>
                </Tooltip>
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold capitalize py-2">{item.name}</h3>
              <p className="text-sm text-gray-600 py-2">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-600 py-2">Price: {item.price}</p>
              <p className="text-sm text-gray-600 py-2">Expiration Date: {item.expirationDate}</p>
              <p className="text-sm text-gray-600 py-2">Storage Location: {item.storageLocation}</p>
              <p className="text-sm text-gray-600 py-2"> {item.notes}</p>
            </div>
          </div>
          <div className="flex justify-end gap-4 w-full">
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
