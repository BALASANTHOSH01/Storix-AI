// src/services/firestoreService.ts

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';

const itemsCollection = collection(firestore, 'items'); // Collection reference

export const addItem = async (item: any) => {
  try {
    await addDoc(itemsCollection, item);
  } catch (error) {
    console.error('Error adding item: ', error);
  }
};

export const getItems = async () => {
  try {
    const querySnapshot = await getDocs(itemsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching items: ', error);
    return [];
  }
};

export const updateItem = async (id: string, updatedItem: any) => {
  try {
    const itemDoc = doc(firestore, 'items', id);
    await updateDoc(itemDoc, updatedItem);
  } catch (error) {
    console.error('Error updating item: ', error);
  }
};

export const deleteItem = async (id: string) => {
  try {
    const itemDoc = doc(firestore, 'items', id);
    await deleteDoc(itemDoc);
  } catch (error) {
    console.error('Error deleting item: ', error);
  }
};
