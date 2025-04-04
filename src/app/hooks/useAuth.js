import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}