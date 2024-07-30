"use client"

import { firestore } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const fetchPantryItems = async () => {
  const pantryRef = collection(firestore, "pantryItems");
  const pantrySnapshot = await getDocs(pantryRef);
  return pantrySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
