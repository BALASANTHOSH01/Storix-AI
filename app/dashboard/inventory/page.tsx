// src/pages/dashboard/inventory.tsx
"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import InventoryList from "@/components/Inventory/InventoryList";
import { fetchInventoryItems } from "@/services/inventoryService";

interface Item {
  id: string;
  name: string;
  quantity: number;
  image?: string;
}

const Inventory = () => {
  const router = useRouter();
  const [inventoryItems, setInventoryItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const getInventoryItems = async () => {
      try {
        const items = await fetchInventoryItems();
        setInventoryItems(items);
      } catch (error) {
        console.error("Failed to fetch inventory items:", error);
      } finally {
        setLoading(false);
      }
    };
    getInventoryItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      <InventoryList items={inventoryItems} onEdit={() => {}} onDelete={() => {}} />
    </DashboardLayout>
  );
};

export default Inventory;
