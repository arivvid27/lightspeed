import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import Image from 'next/image';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 py-6 md:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">C</div>
            <h1 className="ml-2 text-xl font-bold text-gray-900">CareTrack</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a></li>
            </ul>
          </nav>
          <div>
            <Link href="/login" passHref>
              <Button as="a" variant="primary" size="md">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Track, Monitor, and Support Special Needs Care
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              A comprehensive tracking app designed for caregivers of children with special needs. Monitor medication, food, activities, and track progress all in one place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/login" passHref>
                <Button as="a" variant="primary" size="lg">Get Started</Button>
              </Link>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative h-[400px] w-full rounded-lg shadow-xl overflow-hidden bg-white p-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-10"></div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="rounded-full bg-blue-100 h-24 w-24 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">App Interface Preview</h3>
                  <p className="mt-2 text-gray-600">
                    Clean, intuitive and designed for daily use by caregivers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">Designed for Caregivers</h2>
          <p className="mt-4 text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Our app provides the tools you need to monitor and support children with special needs
          </p>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Comprehensive Tracking</h3>
              <p className="mt-2 text-gray-600">
                Monitor food, medication, activities, therapy sessions, behavior, and progress all in one place.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Data Visualization</h3>
              <p className="mt-2 text-gray-600">
                See trends, patterns, and progress with intuitive charts and graphs that help identify what works.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Customizable</h3>
              <p className="mt-2 text-gray-600">
                Create custom categories and tracking options that fit your specific needs and situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Get started in three simple steps
          </p>
          
          <div className="mt-12 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 flex justify-center">
                <div className="rounded-full bg-blue-100 h-24 w-24 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">1</span>
                </div>
              </div>
              <div className="md:w-2/3 mt-6 md:mt-0">
                <h3 className="text-xl font-medium text-gray-900">Create an Account</h3>
                <p className="mt-2 text-gray-600">
                  Sign up with your Google account for quick and secure access to the app.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 flex justify-center">
                <div className="rounded-full bg-blue-100 h-24 w-24 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">2</span>
                </div>
              </div>
              <div className="md:w-2/3 mt-6 md:mt-0">
                <h3 className="text-xl font-medium text-gray-900">Customize Your Dashboard</h3>
                <p className="mt-2 text-gray-600">
                  Set up your tracking categories and add custom options that suit your specific needs.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="rounded-full bg-blue-100 h-24 w-24 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">3</span>
                </div>
              </div>
              <div className="md:w-2/3 mt-6 md:mt-0">
                <h3 className="text-xl font-medium text-gray-900">Start Tracking</h3>
                <p className="mt-2 text-gray-600">
                  Begin logging daily activities, medications, behaviors, and progress to build meaningful insights over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Join other caregivers who are using CareTrack to provide better support for children with special needs.
          </p>
          <div className="mt-8">
            <Link href="/login" passHref>
              <Button as="a" variant="secondary" size="lg">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">C</div>
                <h3 className="ml-2 text-xl font-bold">CareTrack</h3>
              </div>
              <p className="mt-4 text-gray-400 max-w-xs">
                A comprehensive tracking app designed for caregivers of children with special needs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-medium mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center md:text-left">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} CareTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}