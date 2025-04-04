// pages/dashboard.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { getEntries } from '../firebase/firestore';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Dashboard
            </h1>
            
            {dataLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : entries.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No entries found. Start by adding a new entry.
                </p>
                <button
                  onClick={() => router.push('/entries')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add First Entry
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <LineChart 
                      entries={entries} 
                      title="Progress Tracking"
                    />
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <BarChart 
                      entries={entries} 
                      title="Category Distribution"
                    />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Recent Entries
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {entries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {entry.description || entry.category}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)} • {entry.category}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {entries.length > 5 && (
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                      <button
                        onClick={() => router.push('/entries')}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View all entries
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}