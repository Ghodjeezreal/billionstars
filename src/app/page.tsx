"use client";

import Link from "next/link";
import { Search, Play, Instagram, Youtube, Twitter, Facebook, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                BILLION STARS
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="#artists" className="hover:text-purple-400 transition-colors">
                  Artists
                </Link>
                <Link href="#music" className="hover:text-purple-400 transition-colors">
                  Music
                </Link>
                <Link href="#producers" className="hover:text-purple-400 transition-colors">
                  Producers
                </Link>
                <Link href="#about" className="hover:text-purple-400 transition-colors">
                  About
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button and search */}
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Search className="h-5 w-5" />
              </button>
              
              {/* Mobile menu button */}
              <button 
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md rounded-lg mt-2">
              <Link 
                href="#artists" 
                className="block px-3 py-2 text-base font-medium hover:text-purple-400 hover:bg-gray-800/50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                Artists
              </Link>
              <Link 
                href="#music" 
                className="block px-3 py-2 text-base font-medium hover:text-purple-400 hover:bg-gray-800/50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                Music
              </Link>
              <Link 
                href="#producers" 
                className="block px-3 py-2 text-base font-medium hover:text-purple-400 hover:bg-gray-800/50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                Producers
              </Link>
              <Link 
                href="#about" 
                className="block px-3 py-2 text-base font-medium hover:text-purple-400 hover:bg-gray-800/50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/Ck0pfYYwx8U?autoplay=1&mute=1&loop=1&playlist=Ck0pfYYwx8U&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&start=0&end=0&version=3&enablejsapi=1&origin=localhost"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100vh',
              minWidth: '177.77vh', // 16:9 aspect ratio
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%',
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Billion Stars Hero Video"
          />
        </div>
        
        {/* Animated Fallback Background (in case YouTube doesn't load) */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black opacity-80">
          <div className="absolute inset-0 animate-pulse" style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 120, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(120, 255, 198, 0.3) 0%, transparent 50%)
            `
          }}></div>
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Content 
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-2 sm:mb-4 text-red-500 tracking-wider drop-shadow-2xl animate-pulse">
            5 YEARS OF
          </h2>
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 sm:mb-8 text-red-500 tracking-wider drop-shadow-2xl animate-pulse">
            COSMIC ASCENT
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white max-w-2xl mx-auto drop-shadow-lg px-4">
            Elevating artists to stellar heights across the musical universe
          </p>
        </div> */}
      </section>

      {/* Artists Section */}
      <section id="artists" className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">artists</h2>
            <Link href="/artists" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium text-sm sm:text-base">
              Show All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {/* Top Row */}
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  SN
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Stella Nova</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  CR
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Cosmic Ray</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer col-span-2 sm:col-span-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  SF
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Solar Flare</h3>
                </div>
              </div>
            </div>
            {/* Second Row */}
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-500 to-blue-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  LE
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Luna Eclipse</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  GD
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Galaxy Dreams</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-red-500 to-pink-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  NS
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Nebula Storm</h3>
                </div>
              </div>
            </div>
            {/* Third Row - Hidden on mobile, shown on larger screens */}
            <div className="relative group cursor-pointer hidden sm:block">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500 to-red-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  AP
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Astro Phoenix</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer hidden sm:block">
              <div className="aspect-[4/3] bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  MM
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Meteor Muse</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer hidden sm:block">
              <div className="aspect-[4/3] bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  VS
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-3">
                  <h3 className="text-white font-bold text-sm sm:text-base">Void Seeker</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Music Section */}
      <section id="music" className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-white">new music</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3 sm:mb-4 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                  ★
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Play className="h-8 w-8 sm:h-12 sm:w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <h4 className="font-bold text-white text-sm sm:text-base">Starlight</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Stella Nova</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-3 sm:mb-4 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                  ◊
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Play className="h-8 w-8 sm:h-12 sm:w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <h4 className="font-bold text-white text-sm sm:text-base">Cosmic Vibes</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Cosmic Ray</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mb-3 sm:mb-4 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                  ●
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Play className="h-8 w-8 sm:h-12 sm:w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <h4 className="font-bold text-white text-sm sm:text-base">Midnight Eclipse</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Luna Eclipse</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg mb-3 sm:mb-4 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                  ◈
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Play className="h-8 w-8 sm:h-12 sm:w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <h4 className="font-bold text-white text-sm sm:text-base">Solar Beats</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Solar Flare</p>
            </div>
          </div>
        </div>
      </section>

      {/* Producers Section */}
      <section id="producers" className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-white">producers & writers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Top Row */}
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-500 to-blue-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                  SB
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                  <h3 className="text-white font-bold">Stellar Beats</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                  CS
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                  <h3 className="text-white font-bold">Cosmic Sounds</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                  GW
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                  <h3 className="text-white font-bold">Galaxy Writer</h3>
                </div>
              </div>
            </div>
            {/* Bottom Row */}
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-500 to-green-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                  NN
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                  <h3 className="text-white font-bold">Nebula Notes</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500 to-red-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                  SM
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                  <h3 className="text-white font-bold">Star Maker</h3>
                </div>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                  AA
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                  <h3 className="text-white font-bold">Astro Audio</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Universe Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-white">our universe</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center justify-center">
          </div>
          
          {/* Additional Partner Logos Row */}
          <div className="mt-8 sm:mt-12 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 items-center opacity-60 hover:opacity-80 transition-opacity">
            {/* Distribution Partners */}
            <a href="#" className="group cursor-pointer block">
              <div className="bg-gray-800 hover:bg-gray-700 border border-gray-600 p-3 sm:p-4 rounded-lg aspect-video flex items-center justify-center transition-all group-hover:scale-105">
                <span className="text-xs sm:text-sm font-semibold text-gray-300">SPOTIFY</span>
              </div>
            </a>
            
            <a href="#" className="group cursor-pointer block">
              <div className="bg-gray-800 hover:bg-gray-700 border border-gray-600 p-3 sm:p-4 rounded-lg aspect-video flex items-center justify-center transition-all group-hover:scale-105">
                <span className="text-xs sm:text-sm font-semibold text-gray-300">APPLE</span>
              </div>
            </a>
            
            <a href="#" className="group cursor-pointer block">
              <div className="bg-gray-800 hover:bg-gray-700 border border-gray-600 p-3 sm:p-4 rounded-lg aspect-video flex items-center justify-center transition-all group-hover:scale-105">
                <span className="text-xs sm:text-sm font-semibold text-gray-300">TIDAL</span>
              </div>
            </a>
            
            <a href="#" className="group cursor-pointer block">
              <div className="bg-gray-800 hover:bg-gray-700 border border-gray-600 p-3 sm:p-4 rounded-lg aspect-video flex items-center justify-center transition-all group-hover:scale-105">
                <span className="text-xs sm:text-sm font-semibold text-gray-300">AMAZON</span>
              </div>
            </a>
            
            <a href="#" className="group cursor-pointer block">
              <div className="bg-gray-800 hover:bg-gray-700 border border-gray-600 p-3 sm:p-4 rounded-lg aspect-video flex items-center justify-center transition-all group-hover:scale-105">
                <span className="text-xs sm:text-sm font-semibold text-gray-300">YOUTUBE</span>
              </div>
            </a>
            
            <a href="#" className="group cursor-pointer block">
              <div className="bg-gray-800 hover:bg-gray-700 border border-gray-600 p-3 sm:p-4 rounded-lg aspect-video flex items-center justify-center transition-all group-hover:scale-105">
                <span className="text-xs sm:text-sm font-semibold text-gray-300">DEEZER</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                BILLION STARS
              </h3>
              <p className="text-gray-400 mb-6">Where music meets the cosmos</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                <li><Link href="#careers" className="hover:text-purple-400 transition-colors">Careers</Link></li>
                <li><Link href="#contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#terms" className="hover:text-purple-400 transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Billion Stars Records. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}