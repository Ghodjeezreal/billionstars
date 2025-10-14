import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Artists() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-red-600 bg-clip-text text-transparent">
                BSIS
              </h1>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">Our Artists</h1>
          
          {/* Featured Artist */}
          <div className="max-w-4xl mx-auto">
            <Link href="/artists/snupy-c" className="group block">
              <div className="bg-gray-900/30 rounded-2xl p-8 hover:bg-gray-800/40 transition-all duration-300 group-hover:scale-105">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">SC</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
                      S.N.U.P.Y C
                    </h2>
                    <p className="text-xl text-gray-300 mb-2">Hip-Hop Artist</p>
                    <p className="text-gray-400">
                      Rising star bringing fresh beats and powerful lyrics to Billion Stars Records.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Coming Soon Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Expanding Our Roster</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900/20 border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-lg font-bold text-gray-400">Coming Soon</h3>
                <p className="text-gray-500">New artist announcements</p>
              </div>
              <div className="bg-gray-900/20 border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-lg font-bold text-gray-400">Talent Search</h3>
                <p className="text-gray-500">Scouting new talent</p>
              </div>
              <div className="bg-gray-900/20 border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-bold text-gray-400">Future Stars</h3>
                <p className="text-gray-500">The next generation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
