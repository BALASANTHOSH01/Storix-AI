"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Item {
  id?: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  image?: string;
  expirationDate?: any;
  storageLocation?: string;
  notes?: string;
}

interface AddEditItemFormProps {
  item?: Item;
  onSave: (item: Item, imageFile: File | null) => void;
  onCancel: () => void;
}

const categoryOptions = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Meat",
  "Fish",
  "Bakery",
  "Beverages",
  "Canned Goods",
  "Dry Goods",
  "Frozen Foods",
  "Snacks",
  "Condiments",
  "Spices",
  "Personal Care",
  "Cleaning Supplies",
  "Other"
];

const AddEditItemForm: React.FC<AddEditItemFormProps> = ({ item = {}, onSave, onCancel }) => {
  const [name, setName] = useState(item.name || '');
  const [quantity, setQuantity] = useState(item.quantity || 0);
  const [price, setPrice] = useState(item.price || 0);
  const [category, setCategory] = useState(item.category || categoryOptions[0]); // Default category
  const [image, setImage] = useState(item.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [expirationDate, setExpirationDate] = useState(item.expirationDate || '');
  const [storageLocation, setStorageLocation] = useState(item.storageLocation || '');
  const [notes, setNotes] = useState(item.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, quantity, category, price, image, expirationDate, storageLocation, notes }, imageFile);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0])); // Preview the selected image
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border border-slate-500 p-6 rounded-lg shadow-md mx-auto">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
          required
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Expiration Date</label>
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Storage Location</label>
        <input
          type="text"
          value={storageLocation}
          onChange={(e) => setStorageLocation(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
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
          className="bg-gradient-to-br from-blue-300 to-purple-600 px-5 py-4 rounded-xl hover:from-purple-300 hover:to-purple-600 transition ease-in-out duration-200 font-bold w-1/2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddEditItemForm;
