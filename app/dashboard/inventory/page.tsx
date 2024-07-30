// src/pages/dashboard/inventory.tsx

import DashboardLayout from "../../components/DashboardLayout";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import InventoryList from "../../components/InventoryList";
import { fetchInventoryItems } from "../../services/inventoryService";

const Inventory = () => {
  const router = useRouter();
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);

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
      const items = await fetchInventoryItems();
      setInventoryItems(items);
    };
    getInventoryItems();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      <InventoryList items={inventoryItems} />
    </DashboardLayout>
  );
};

export default Inventory;
