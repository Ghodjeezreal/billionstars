import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function Artists() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  BILLION STARS
                </h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/artists" className="text-purple-400">
                  Artists
                </Link>
                <Link href="/#music" className="hover:text-purple-400 transition-colors">
                  Music
                </Link>
                <Link href="/#producers" className="hover:text-purple-400 transition-colors">
                  Producers
                </Link>
                <Link href="/#about" className="hover:text-purple-400 transition-colors">
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Artists</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Meet the stellar talent that makes Billion Stars shine across the universe
          </p>
        </div>
      </section>

      {/* Current Artists */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Current Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArtists.map((artist) => (
              <div key={artist.id} className="group cursor-pointer">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-lg font-bold">{artist.name}</h3>
                        <p className="text-sm text-gray-300">{artist.genre}</p>
                      </div>
                      <button className="bg-white text-black rounded-full p-2 hover:scale-110 transition-transform">
                        ▶
                      </button>
                    </div>
                  </div>
                  <div className={`w-full h-full bg-gradient-to-br ${artist.gradient} flex items-center justify-center`}>
                    <span className="text-4xl font-bold">{artist.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-purple-400 text-sm font-medium mb-3">{artist.genre}</p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{artist.description}</p>
                  <div className="flex space-x-4 text-xs text-gray-500">
                    <span className="bg-gray-800 px-2 py-1 rounded">{artist.albums} Albums</span>
                    <span className="bg-gray-800 px-2 py-1 rounded">{artist.streams} Streams</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Artists */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Legacy Artists</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Honoring the stars who helped build our cosmic legacy and paved the way for future generations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {legacyArtists.map((artist) => (
              <div key={artist.id} className="text-center group cursor-pointer">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 mb-3">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`w-full h-full bg-gradient-to-br ${artist.gradient} flex items-center justify-center`}>
                    <span className="text-2xl font-bold">{artist.name.charAt(0)}</span>
                  </div>
                </div>
                <h4 className="font-semibold group-hover:text-purple-400 transition-colors text-sm">
                  {artist.name}
                </h4>
                <p className="text-xs text-gray-500">{artist.years}</p>
              </div>
            ))}
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
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
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

// Sample data
const currentArtists = [
  {
    id: 1,
    name: "Stella Nova",
    genre: "Pop/R&B",
    description: "Rising star with a voice that captivates audiences worldwide. Known for her powerful vocals and contemporary R&B style that blends classic soul with modern production.",
    albums: "3",
    streams: "15M+",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    name: "Cosmic Ray",
    genre: "Hip-Hop",
    description: "Dynamic rapper and songwriter bringing fresh energy to the hip-hop scene with cosmic-themed lyrics and stellar beats that transport listeners to another dimension.",
    albums: "2",
    streams: "8M+",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: 3,
    name: "Luna Eclipse",
    genre: "Alternative",
    description: "Innovative alternative artist exploring the depths of human emotion through haunting melodies and introspective lyrics that resonate with the soul.",
    albums: "1",
    streams: "5M+",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 4,
    name: "Solar Flare",
    genre: "Electronic",
    description: "Electronic music producer creating immersive soundscapes that transport listeners to otherworldly dimensions with cutting-edge synthesis and cosmic themes.",
    albums: "2",
    streams: "12M+",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    id: 5,
    name: "Nebula Storm",
    genre: "Rock",
    description: "High-energy rock band delivering thunderous performances and anthemic songs that ignite audiences across the galaxy with their explosive sound.",
    albums: "1",
    streams: "7M+",
    gradient: "from-red-500 to-pink-500"
  },
  {
    id: 6,
    name: "Galaxy Dreams",
    genre: "Indie Pop",
    description: "Dreamy indie pop duo crafting ethereal melodies and whimsical lyrics that capture the magic of stargazing and cosmic wonder.",
    albums: "1",
    streams: "3M+",
    gradient: "from-teal-500 to-blue-500"
  },
  {
    id: 7,
    name: "Astro Phoenix",
    genre: "Soul/Funk",
    description: "Soulful performer with a voice that rises from the ashes of classic funk, bringing timeless grooves to modern audiences.",
    albums: "Singles",
    streams: "2M+",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 8,
    name: "Meteor Muse",
    genre: "Folk/Acoustic",
    description: "Storytelling songwriter with an acoustic guitar and a heart full of cosmic tales that resonate with earthbound souls.",
    albums: "1",
    streams: "1.5M+",
    gradient: "from-green-500 to-teal-500"
  }
];

const legacyArtists = [
  { id: 1, name: "Starlight Legend", years: "2018-2023", gradient: "from-purple-400 to-pink-400" },
  { id: 2, name: "Cosmic Pioneer", years: "2019-2024", gradient: "from-blue-400 to-purple-400" },
  { id: 3, name: "Galaxy Icon", years: "2020-2024", gradient: "from-indigo-400 to-purple-400" },
  { id: 4, name: "Astral Voice", years: "2017-2022", gradient: "from-teal-400 to-blue-400" },
  { id: 5, name: "Nova Spirit", years: "2016-2021", gradient: "from-green-400 to-teal-400" },
  { id: 6, name: "Star Whisper", years: "2019-2023", gradient: "from-yellow-400 to-orange-400" }
];

const socialLinks = [
  { name: "Instagram", url: "#" },
  { name: "TikTok", url: "#" },
  { name: "Twitter", url: "#" },
  { name: "YouTube", url: "#" },
];