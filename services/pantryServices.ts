import { firestore } from "../firebase/config";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

// Fetch pantry items
export const fetchPantryItems = async () => {
  const pantryCollection = collection(firestore, 'pantryItems');
  const snapshot = await getDocs(pantryCollection);
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return items;
};

// Add a new pantry item
export const addPantryItem = async (item: any) => {
  const newDocRef = doc(collection(firestore, "pantryItems"));
  await setDoc(newDocRef, item);
  return { id: newDocRef.id, ...item };
};

// Update an existing pantry item
export const updatePantryItem = async (id: string, updatedItem: any) => {
  const itemRef = doc(firestore, "pantryItems", id);
  await setDoc(itemRef, updatedItem, { merge: true });
  return { id, ...updatedItem };
};

// Delete a pantry item
export const deletePantryItem = async (id: string) => {
  const itemRef = doc(firestore, "pantryItems", id);
  await deleteDoc(itemRef);
};
