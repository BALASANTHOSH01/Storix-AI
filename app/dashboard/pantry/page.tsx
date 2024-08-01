"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import PantryList from "@/components/Pantry/PantryList";
import AddEditItemForm from "@/components/AddEditItemForm";
import {
  fetchPantryItemsForUser,
  addPantryItem,
  updatePantryItem,
  deletePantryItem,
} from "@/services/pantryServices";
import { uploadImage } from "@/services/storageService";
import { useAuth } from "@/hooks/useAuth"; 

const Pantry = () => {
  const { user } = useAuth(); // Assuming user object has userId property
  const [pantryItems, setPantryItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null); // Ensure editingItem is either null or an item

  useEffect(() => {
    const getItems = async () => {
      if (user) {
        try {
          const items = await fetchPantryItemsForUser();
          setPantryItems(items);
        } catch (error) {
          console.error("Failed to fetch pantry items:", error);
        }
      }
    };
    getItems();
  }, [user]);

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
      const items = await fetchPantryItemsForUser();
      setPantryItems(items);
    } catch (error) {
      console.error("Failed to save pantry item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePantryItem(id);
      const items = await fetchPantryItemsForUser();
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
      <div className="flex justify-between md:flex-col items-center lg:py-10">
        <h1 className="text-3xl font-bold text-center py-8">
          Pantry Management
        </h1>

        <button
          onClick={() => setEditingItem({ name: "", quantity: 0, image: "" })}
          className="bg-gradient-to-br from-blue-300 to-purple-600 px-5 py-3 rounded-xl hover:from-purple-300 hover:to-purple-600 transition ease-in-out duration-200 font-bold"
        >
          Add New Item
        </button>
      </div>

      <div className="pb-20">
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
      </div>
    </DashboardLayout>
  );
};

export default Pantry;
