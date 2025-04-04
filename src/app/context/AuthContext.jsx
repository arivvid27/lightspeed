import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // User is signed in
        const userRef = doc(db, 'users', authUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          // Create user document if it doesn't exist
          await setDoc(userRef, {
            email: authUser.email,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
            createdAt: new Date(),
            settings: {
              theme: 'light',
              defaultCategories: {
                food: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
                medicine: ['Morning', 'Afternoon', 'Evening', 'As needed'],
                activity: ['Physical', 'Educational', 'Recreational', 'Social'],
                therapy: ['Speech', 'Occupational', 'Physical', 'Behavioral'],
                behavior: ['Calm', 'Agitated', 'Happy', 'Distressed'],
                progress: ['Major improvement', 'Minor improvement', 'No change', 'Minor regression', 'Major regression']
              }
            }
          });
        }
        
        // Get user data
        const userData = userSnap.exists() ? userSnap.data() : null;
        
        setUser({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
          ...userData
        });
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);