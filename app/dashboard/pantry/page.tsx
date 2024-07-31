"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import PantryList from "@/components/Pantry/PantryList";
import AddEditItemForm from "@/components/AddEditItemForm";
import {
  fetchPantryItems,
  addPantryItem,
  updatePantryItem,
  deletePantryItem,
} from "@/services/pantryServices";
import { uploadImage } from "@/services/storageService";

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null); // Ensure editingItem is either null or an item

  useEffect(() => {
    const getItems = async () => {
      try {
        const items = await fetchPantryItems();
        setPantryItems(items);
      } catch (error) {
        console.error("Failed to fetch pantry items:", error);
      }
    };
    getItems();
  }, []);

  const handleSave = async (item: any, imageFile: File | null) => {
    try {
      let imageUrl = item.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        console.log("Uploaded Image URL:", imageUrl);
      }

      if (editingItem?.id) {
        // Update existing item
        await updatePantryItem(editingItem.id, { ...item, image: imageUrl });
      } else {
        // Add new item
        await addPantryItem({ ...item, image: imageUrl });
        console.log("Adding pantry item:", { ...item, image: imageUrl });
      }

      setEditingItem(null);
      const items = await fetchPantryItems();
      setPantryItems(items);
    } catch (error) {
      console.error("Failed to save pantry item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePantryItem(id);
      const items = await fetchPantryItems();
      setPantryItems(items);
    } catch (error) {
      console.error("Failed to delete pantry item:", error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pantry Management
      </h1>
      
      <button
        onClick={() => setEditingItem({ name: "", quantity: 0, image: "" })}
        className="mb-6 absolute px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-[15%] top-[4%] right-[5%]"
      >
        Add New Item
      </button>

      {editingItem ? (
        <AddEditItemForm
          item={editingItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <PantryList
          items={pantryItems}
          onEdit={setEditingItem}
          onDelete={handleDelete}
        />
      )}
    </DashboardLayout>
  );
};

export default Pantry;
