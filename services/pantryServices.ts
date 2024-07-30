// src/services/pantryService.ts

import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const fetchPantryItems = async () => {
  const pantryRef = collection(db, "pantryItems");
  const pantrySnapshot = await getDocs(pantryRef);
  return pantrySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
