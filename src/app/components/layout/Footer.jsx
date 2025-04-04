import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground mb-2 md:mb-0">
          &copy; {year} Lightspeed Tracker. All rights reserved.
        </div>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
          <a href="#" className="hover:text-foreground">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}