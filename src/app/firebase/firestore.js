import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    doc, 
    updateDoc, 
    deleteDoc, 
    Timestamp,
    orderBy 
  } from 'firebase/firestore';
  import { db } from './config';
  
  // Add a new entry
  export const addEntry = async (userId, entryData) => {
    try {
      const entriesRef = collection(db, 'users', userId, 'entries');
      const docRef = await addDoc(entriesRef, {
        ...entryData,
        timestamp: Timestamp.now(),
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding entry: ', error);
      throw error;
    }
  };
  
  // Get all entries for a user
  export const getEntries = async (userId, filters = {}) => {
    try {
      const entriesRef = collection(db, 'users', userId, 'entries');
      
      let q = query(entriesRef, orderBy('timestamp', 'desc'));
      
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      
      if (filters.startDate && filters.endDate) {
        q = query(
          q, 
          where('timestamp', '>=', Timestamp.fromDate(new Date(filters.startDate))),
          where('timestamp', '<=', Timestamp.fromDate(new Date(filters.endDate)))
        );
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
        createdAt: doc.data().createdAt.toDate(),
      }));
    } catch (error) {
      console.error('Error getting entries: ', error);
      throw error;
    }
  };
  
  // Get user's custom options
  export const getUserCustomOptions = async (userId) => {
    try {
      const optionsRef = collection(db, 'users', userId, 'customOptions');
      const querySnapshot = await getDocs(optionsRef);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting custom options: ', error);
      throw error;
    }
  };
  
  // Add a custom option
  export const addCustomOption = async (userId, optionData) => {
    try {
      const optionsRef = collection(db, 'users', userId, 'customOptions');
      const docRef = await addDoc(optionsRef, {
        ...optionData,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding custom option: ', error);
      throw error;
    }
  };
  
  // Update user settings
  export const updateUserSettings = async (userId, settings) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { settings });
      return true;
    } catch (error) {
      console.error('Error updating user settings: ', error);
      throw error;
    }
  };