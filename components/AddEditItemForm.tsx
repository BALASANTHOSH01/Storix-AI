"use client";

import Image from 'next/image';
import React, { useState } from 'react';

interface Item {
  id?: string;
  name: string;
  quantity: number;
  image?: string;
}

interface AddEditItemFormProps {
  item?: Item;
  onSave: (item: Item, imageFile: File | null) => void;
  onCancel: () => void;
}

const AddEditItemForm: React.FC<AddEditItemFormProps> = ({ item = {}, onSave, onCancel }) => {
  const [name, setName] = useState(item.name || '');
  const [quantity, setQuantity] = useState(item.quantity || 0);
  const [image, setImage] = useState(item.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, quantity, image }, imageFile);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border bg-white p-6 md:w-[50%] sm:w-[100%] rounded-lg shadow-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full mt-1 text-gray-500 border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm border p-2"
          accept="image/*"
        />
        {image && (
          <div className="mt-4">
            <Image src={image} alt={name} width={96} height={96} className="rounded-md shadow-sm object-cover" />
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-[50%]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-[50%]"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddEditItemForm;
