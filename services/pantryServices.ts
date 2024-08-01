import { firestore } from "../firebase/config";
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Get current user ID
const getCurrentUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};

// Fetch pantry items for the current user
export const fetchPantryItemsForUser = async () => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const pantryCollection = collection(firestore, 'pantryItems');
  const q = query(pantryCollection, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return items;
};

// Add a new pantry item
export const addPantryItem = async (item: any) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const newDocRef = doc(collection(firestore, "pantryItems"));
  await setDoc(newDocRef, { ...item, userId });
  return { id: newDocRef.id, ...item };
};

// Update an existing pantry item
export const updatePantryItem = async (id: string, updatedItem: any) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const itemRef = doc(firestore, "pantryItems", id);
  await setDoc(itemRef, { ...updatedItem, userId }, { merge: true });
  return { id, ...updatedItem };
};

// Delete a pantry item
export const deletePantryItem = async (id: string) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const itemRef = doc(firestore, "pantryItems", id);
  await deleteDoc(itemRef);
};
