// pages/entries.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { getEntries } from '../firebase/firestore';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import EntryForm from '../components/forms/EntryForm';
import CustomizeForm from '../components/forms/CustomizeForm';
import { Button } from '../components/ui/Button';

export default function Entries() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showCustomizeForm, setShowCustomizeForm] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load data if user is authenticated
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    try {
      setDataLoading(true);
      const entriesData = await getEntries(user.uid);
      setEntries(entriesData);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleEntryAdded = () => {
    loadEntries();
  };

  const handleCustomOptionAdded = () => {
    setShowCustomizeForm(false);
    // Could reload user data here if needed
  };

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex h-full">
        <div className="hidden md:flex md:w-64 h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>
        
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {showCustomizeForm ? 'Add Custom Option' : 'Add New Entry'}
              </h1>
              
              <Button
                onClick={() => setShowCustomizeForm(!showCustomizeForm)}
                variant="outline"
              >
                {showCustomizeForm ? 'Back to Entry Form' : 'Customize Options'}
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
              {showCustomizeForm ? (
                <CustomizeForm 
                  onSuccess={handleCustomOptionAdded} 
                  onCancel={() => setShowCustomizeForm(false)}
                />
              ) : (
                <EntryForm onSuccess={handleEntryAdded} />
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Recent Entries
                </h2>
              </div>
              {dataLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                </div>
              ) : entries.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No entries found
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {entries.map((entry) => (
                    <div key={entry.id} className="p-6">
                      {/* Entry content here */}
                      <div className="text-gray-900 dark:text-white">{entry.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}