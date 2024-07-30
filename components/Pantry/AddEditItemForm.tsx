// src/components/Pantry/AddEditItemForm.tsx
import React, { useState, useEffect } from 'react';

interface Item {
  id?: string;
  name: string;
  quantity: number;
  image?: string; // Optional field for image URL
}

interface AddEditItemFormProps {
  item?: Item;
  onSave: (item: Item) => void;
  onCancel: () => void;
}

const AddEditItemForm: React.FC<AddEditItemFormProps> = ({ item, onSave, onCancel }) => {
  const [name, setName] = useState(item?.name || '');
  const [quantity, setQuantity] = useState(item?.quantity || 0);
  const [image, setImage] = useState(item?.image || '');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setImage(item.image || '');
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: item?.id, name, quantity, image });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="block w-full mt-1 border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEditItemForm;
