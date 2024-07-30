"use client";

import { useRouter } from 'next/navigation';
import { addPantryItem } from '@/services/pantryServices';
import { uploadImage } from '@/services/storageService';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import AddEditItemForm from '@/components/AddEditItemForm';

const AddPantryItem = () => {
  const router = useRouter();

  const handleSave = async (item: any, imageFile: File | null) => {
    try {
      // Handle image upload if there's an image file
      let imageUrl = item.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await addPantryItem({ ...item, image: imageUrl });
      router.push('/dashboard/pantry'); // Redirect to the pantry page after saving
    } catch (error) {
      console.error("Failed to save pantry item:", error);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/pantry'); // Redirect to the pantry page if cancelled
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-center">Add Pantry Item</h1>
      <AddEditItemForm onSave={handleSave} onCancel={handleCancel} />
    </DashboardLayout>
  );
};

export default AddPantryItem;
