// src/services/inventoryService.ts

import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const fetchInventoryItems = async () => {
  const inventoryRef = collection(db, "inventoryItems");
  const inventorySnapshot = await getDocs(inventoryRef);
  return inventorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
