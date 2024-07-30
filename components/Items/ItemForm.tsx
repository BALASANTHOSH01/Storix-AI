"use client"

import { useState } from 'react';
import { addItem, updateItem } from '../../services/firebaseService';
import { uploadImage } from '../../services/storageService';
import Image from 'next/image';

interface ItemFormProps {
  item?: any; // Optional item for editing
  onSuccess: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onSuccess }) => {
  const [name, setName] = useState(item?.name || '');
  const [quantity, setQuantity] = useState(item?.quantity || '');
  const [description, setDescription] = useState(item?.description || '');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || '');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const uploadedImageUrl = await uploadImage(file);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = { name, quantity, description, imageUrl };

    if (item) {
      // Update existing item
      await updateItem(item.id, newItem);
    } else {
      // Add new item
      await addItem(newItem);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {imageUrl && <Image src={imageUrl} alt="Item Image" className="mt-2 w-32 h-32 object-cover" />}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {item ? 'Update Item' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
