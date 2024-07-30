"use client"

import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const fetchInventoryItems = async () => {
  const inventoryRef = collection(firestore, "inventoryItems");
  const inventorySnapshot = await getDocs(inventoryRef);
  return inventorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
