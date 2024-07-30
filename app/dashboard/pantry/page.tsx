// src/pages/dashboard/pantry.tsx
"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import PantryList from '@/components/Pantry/PantryList';
import AddEditItemForm from '@/components/Pantry/AddEditItemForm';
import { fetchPantryItems, addPantryItem, updatePantryItem, deletePantryItem } from '@/services/pantryServices';

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchPantryItems();
      setPantryItems(items);
    };
    getItems();
  }, []);

  const handleSave = async (item: any) => {
    if (item.id) {
      await updatePantryItem(item.id, item);
    } else {
      await addPantryItem(item);
    }
    setEditingItem(null);
    const items = await fetchPantryItems();
    setPantryItems(items);
  };

  const handleDelete = async (id: string) => {
    await deletePantryItem(id);
    const items = await fetchPantryItems();
    setPantryItems(items);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Pantry Management</h1>
      <PantryList items={pantryItems} onEdit={setEditingItem} onDelete={handleDelete} />
      <AddEditItemForm item={editingItem} onSave={handleSave} onCancel={handleCancel} />
    </DashboardLayout>
  );
};

export default Pantry;
