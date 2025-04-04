import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { logOut } from '../../firebase/auth';
import ThemeToggle from '../ThemeToggle';

export default function Header() {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="flex items-center">
                  <svg 
                    className="h-8 w-8 text-blue-600" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                    Special Care Tracker
                  </span>
                </a>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
            
            {!loading && (
              user ? (
                <div className="ml-4 flex items-center">
                  <div className="relative">
                    <div className="flex items-center space-x-3">
                      {user.photoURL && (
                        <img 
                          src={user.photoURL} 
                          alt="User avatar" 
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <div className="hidden md:block">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {user.displayName}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="ml-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login">
                  <a className="ml-4 px-4 py-1.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700">
                    Sign in
                  </a>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}