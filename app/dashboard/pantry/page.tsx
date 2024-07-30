"use client"

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/config"; 
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import PantryList from "@/components/Pantry/PantryList";
import { fetchPantryItems } from "@/services/pantryServices"; 

const Pantry = () => {
  const router = useRouter();
  const [pantryItems, setPantryItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const getPantryItems = async () => {
      const items = await fetchPantryItems();
      setPantryItems(items);
    };
    getPantryItems();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Pantry Management</h1>
      <PantryList items={pantryItems} />
    </DashboardLayout>
  );
};

export default Pantry;