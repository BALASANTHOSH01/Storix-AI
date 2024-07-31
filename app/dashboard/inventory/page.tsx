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
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchInventoryItems();
      setInventoryItems(items);
    };
    getItems();
  }, []);

  const handleSave = async (item: any, imageFile: File | null) => {
    try {
      let imageUrl = item.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      if (item.id) {
        await updateInventoryItem(item.id, { ...item, image: imageUrl });
      } else {
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
    await deleteInventoryItem(id);
    const items = await fetchInventoryItems();
    setInventoryItems(items);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Inventory Management
      </h1>
      
      <button
        onClick={() => setEditingItem({ name: "", quantity: 0, image: "" })}
        className="mb-6 absolute px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-[15%] top-[4%] right-[5%]"
      >
        Add New Item
      </button>

      {editingItem && (
        <AddEditItemForm
          item={editingItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      <InventoryList
        items={inventoryItems}
        onEdit={setEditingItem}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
};

export default Inventory;
