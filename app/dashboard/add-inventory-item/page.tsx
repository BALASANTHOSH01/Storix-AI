"use client";

import { useRouter } from 'next/navigation';
import { addInventoryItem } from '@/services/inventoryService';
import { uploadImage } from '@/services/storageService';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import AddEditItemForm from '@/components/AddEditItemForm';

const AddInventoryItem = () => {
  const router = useRouter();

  const handleSave = async (item: any, imageFile: File | null) => {
    try {
      // Handle image upload if there's an image file
      let imageUrl = item.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await addInventoryItem({ ...item, image: imageUrl });
      router.push('/dashboard/inventory'); // Redirect to the inventory page after saving
    } catch (error) {
      console.error("Failed to save inventory item:", error);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/inventory'); // Redirect to the inventory page if cancelled
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">Add Inventory Item</h1>
      <AddEditItemForm onSave={handleSave} onCancel={handleCancel} />
    </DashboardLayout>
  );
};

export default AddInventoryItem;
