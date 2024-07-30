import { firestore } from "../firebase/config";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

// Fetch inventory items
export const fetchInventoryItems = async () => {
  const inventoryRef = collection(firestore, "inventoryItems");
  const inventorySnapshot = await getDocs(inventoryRef);
  return inventorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Add a new inventory item
export const addInventoryItem = async (item: any) => {
  const newDocRef = doc(collection(firestore, "inventoryItems"));
  await setDoc(newDocRef, item);
  return { id: newDocRef.id, ...item };
};

// Update an existing inventory item
export const updateInventoryItem = async (id: string, updatedItem: any) => {
  const itemRef = doc(firestore, "inventoryItems", id);
  await setDoc(itemRef, updatedItem, { merge: true });
  return { id, ...updatedItem };
};

// Delete an inventory item
export const deleteInventoryItem = async (id: string) => {
  const itemRef = doc(firestore, "inventoryItems", id);
  await deleteDoc(itemRef);
};
