'use client';
import {  Menu } from 'lucide-react';
import { useState } from 'react';
import { SidebarSmallComponent } from './SidebarSmallComponent';


export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50  px-5 py-4 w-full border-b border-lime-500 ">
        <div className="w-full flex justify-between items-center">
          <button
            className="font-medium focus:outline-none sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </button>
      
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className=" absolute md:hidden   bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="h-full max-w-xs" >
            <SidebarSmallComponent />
          </div>
        </div>
      )}
    </>
  );
}