"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import InventoryList from "@/components/Inventory/InventoryList";
import AddEditItemForm from "@/components/AddEditItemForm";
import {
  fetchInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "@/services/inventoryService";
import { uploadImage } from "@/services/storageService";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const items = await fetchInventoryItems();
        setInventoryItems(items);
      } catch (error) {
        console.error("Failed to fetch inventory items:", error);
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

      if (item.id) {
        // Update existing item
        await updateInventoryItem(item.id, { ...item, image: imageUrl });
      } else {
        // Add new item
        await addInventoryItem({ ...item, image: imageUrl });
      }

      setEditingItem(null);
      const items = await fetchInventoryItems();
      setInventoryItems(items);
    } catch (error) {
      console.error("Failed to save inventory item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInventoryItem(id);
      const items = await fetchInventoryItems();
      setInventoryItems(items);
    } catch (error) {
      console.error("Failed to delete inventory item:", error);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center py-8">
          Inventory Management
        </h1>

        <button
          onClick={() => setEditingItem({ name: "", quantity: 0, image: "" })}
          className="bg-gradient-to-br from-blue-300 to-purple-600 px-5 py-3 rounded-xl hover:from-purple-300 hover:to-purple-600 transition ease-in-out duration-200 font-bold"
        >
          Add New Item
        </button>
      </div>

      {editingItem ? (
        <AddEditItemForm
          item={editingItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <InventoryList
          items={inventoryItems}
          onEdit={setEditingItem}
          onDelete={handleDelete}
        />
      )}
    </DashboardLayout>
  );
};

export default Inventory;
