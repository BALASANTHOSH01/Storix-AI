"use client"

import { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../../services/firebaseService';
import ItemForm from './ItemForm';
import Image from 'next/image';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsData = await getItems();
      setItems(itemsData);
    };

    fetchItems();
  }, [isEditing]);

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setIsEditing(!isEditing); // Refresh the list
  };

  return (
    <div className="p-4">
      {selectedItem ? (
        <ItemForm item={selectedItem} onSuccess={() => { setIsEditing(!isEditing); setSelectedItem(null); }} />
      ) : (
        <ItemForm onSuccess={() => setIsEditing(!isEditing)} />
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Items List</h2>
        <ul>
          {items.map(item => (
            <li key={item.id} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Description: {item.description}</p>
              {item.imageUrl && <Image src={item.imageUrl} alt="Item Image" className="mt-2 w-32 h-32 object-cover" />}
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setIsEditing(true);
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
