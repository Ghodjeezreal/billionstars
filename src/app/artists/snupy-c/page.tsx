"use client";

import Link from "next/link";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Instagram, Youtube, Twitter, Facebook, ExternalLink, Music, Download } from "lucide-react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

export default function SnupyC() {
  const [selectedSection, setSelectedSection] = useState("about");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample tracks for S.N.U.P.Y C - wrapped in useMemo to prevent re-creation on every render
  const tracks = useMemo(() => [
    {
      id: 1,
      title: "The way you are",
      artist: "S.N.U.P.Y C",
      duration: "2:15",
      durationSeconds: 135,
      src: "/audio/thewayyouare.mp3",
      artwork: "SC"
    },
    // Additional tracks can be added when more audio files are available
    {
      id: 2,
      title: "Billion Dreams",
      artist: "S.N.U.P.Y C",
      duration: "4:12",
      durationSeconds: 252,
      src: "/audio/billion-dreams.mp3", // Will fall back to demo mode if not available
      artwork: "SC"
    },
    {
      id: 3,
      title: "Street Symphony",
      artist: "S.N.U.P.Y C",
      duration: "3:28",
      durationSeconds: 208,
      src: "/audio/street-symphony.mp3", // Will fall back to demo mode if not available
      artwork: "SC"
    },
  ], []);

  const discography = [
    {
      title: "Debut Single",
      type: "Single",
      year: "2024",
      status: "Coming Soon",
      artwork: "SC"
    },
    // Add more releases as they become available
  ];

  const socialLinks = [
    { platform: "Instagram", icon: Instagram, url: "#", username: "@snupy_c_official" },
    { platform: "YouTube", icon: Youtube, url: "#", username: "S.N.U.P.Y C" },
    { platform: "Twitter", icon: Twitter, url: "#", username: "@snupy_c" },
    { platform: "Facebook", icon: Facebook, url: "#", username: "S.N.U.P.Y C Official" },
  ];

  // Music Player Functions
  const stopDemoPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const nextTrack = useCallback(() => {
    const nextIndex = (currentTrack + 1) % tracks.length;
    // Stop current playback
    stopDemoPlayback();
    setCurrentTime(0);
    setCurrentTrack(nextIndex);
    setDuration(tracks[nextIndex].durationSeconds);
    
    if (audioRef.current) {
      audioRef.current.src = tracks[nextIndex].src;
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        // Real audio is playing
        setIsDemoMode(false);
        setIsPlaying(true);
      }).catch(() => {
        // Audio file not found, use demo mode
        console.log("Audio file not found for:", tracks[nextIndex].title, "- using demo mode");
        setIsDemoMode(true);
        setIsPlaying(true);
        // Start demo playback inline instead of using callback dependency
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setCurrentTime(prevTime => {
            const newTime = prevTime + 1;
            const trackDuration = tracks[nextIndex].durationSeconds;
            
            if (newTime >= trackDuration) {
              // Track finished - this will be handled by the parent nextTrack call
              return trackDuration;
            }
            return newTime;
          });
        }, 1000);
      });
    } else {
      // No audio element, use demo mode
      setIsDemoMode(true);
      setIsPlaying(true);
      // Start demo playback inline
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 1;
          const trackDuration = tracks[nextIndex].durationSeconds;
          
          if (newTime >= trackDuration) {
            // Track finished - this will be handled by the parent nextTrack call
            return trackDuration;
          }
          return newTime;
        });
      }, 1000);
    }
  }, [currentTrack, tracks, stopDemoPlayback]);

  const startDemoPlayback = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setCurrentTime(prevTime => {
        const newTime = prevTime + 1;
        const trackDuration = tracks[currentTrack].durationSeconds;
        
        if (newTime >= trackDuration) {
          // Track finished, go to next track
          nextTrack();
          return 0;
        }
        return newTime;
      });
    }, 1000);
  }, [tracks, currentTrack, nextTrack]);

  const playTrack = useCallback((trackIndex: number) => {
    // Stop current playback
    stopDemoPlayback();
    setCurrentTime(0);
    setCurrentTrack(trackIndex);
    setDuration(tracks[trackIndex].durationSeconds);
    
    if (audioRef.current) {
      audioRef.current.src = tracks[trackIndex].src;
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        // Real audio is playing
        setIsDemoMode(false);
        setIsPlaying(true);
      }).catch(() => {
        // Audio file not found, use demo mode
        console.log("Audio file not found for:", tracks[trackIndex].title, "- using demo mode");
        setIsDemoMode(true);
        setIsPlaying(true);
        startDemoPlayback();
      });
    } else {
      // No audio element, use demo mode
      setIsDemoMode(true);
      setIsPlaying(true);
      startDemoPlayback();
    }
  }, [tracks, stopDemoPlayback, startDemoPlayback]);

  const prevTrack = useCallback(() => {
    const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    playTrack(prevIndex);
  }, [currentTrack, tracks, playTrack]);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      // Try to play real audio first
      if (isPlaying) {
        audioRef.current.pause();
        stopDemoPlayback();
        setIsPlaying(false);
      } else {
        // Set the audio source if not already set
        if (audioRef.current.src !== window.location.origin + tracks[currentTrack].src) {
          audioRef.current.src = tracks[currentTrack].src;
        }
        
        audioRef.current.play().then(() => {
          // Real audio is playing
          setIsDemoMode(false);
          setIsPlaying(true);
          stopDemoPlayback();
        }).catch(() => {
          // Audio file not found or can't play, use demo mode
          console.log("Audio file not found, using demo mode for:", tracks[currentTrack].title);
          setIsDemoMode(true);
          setIsPlaying(true);
          startDemoPlayback();
        });
      }
    } else {
      // No audio element, use demo mode
      if (isPlaying) {
        stopDemoPlayback();
        setIsPlaying(false);
      } else {
        setIsDemoMode(true);
        setIsPlaying(true);
        startDemoPlayback();
      }
    }
  }, [isPlaying, tracks, currentTrack, stopDemoPlayback, startDemoPlayback]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current && !isDemoMode) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [isDemoMode]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current && !isDemoMode) {
      setDuration(audioRef.current.duration);
      console.log("Real audio loaded:", tracks[currentTrack].title, "Duration:", audioRef.current.duration);
    }
  }, [isDemoMode, tracks, currentTrack]);

  const handleAudioEnded = useCallback(() => {
    if (!isDemoMode) {
      console.log("Real audio ended, moving to next track");
      nextTrack();
    }
  }, [isDemoMode, nextTrack]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    
    if (audioRef.current && !isDemoMode) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Initialize duration for current track
  useEffect(() => {
    setDuration(tracks[currentTrack].durationSeconds);
    setCurrentTime(0);
  }, [currentTrack, tracks]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Initialize audio volume on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleAudioEnded);
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, [currentTrack, isDemoMode, handleTimeUpdate, handleLoadedMetadata, handleAudioEnded]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-red-600 bg-clip-text text-transparent">
                  BSIS
                </h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/artists" className="text-green-400">
                  Artists
                </Link>
                <Link href="/#music" className="hover:text-green-400 transition-colors">
                  Music
                </Link>
                <Link href="/#producers" className="hover:text-green-400 transition-colors">
                  Producers
                </Link>
                <Link href="/#about" className="hover:text-green-400 transition-colors">
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-12 bg-gradient-to-br from-green-900/30 to-teal-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/artists"
            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Artists
          </Link>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Artist Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-6xl sm:text-8xl font-bold text-white">SC</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  FEATURED ARTIST
                </div>
              </div>
            </div>

            {/* Artist Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
                S.N.U.P.Y C
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-6">Hip-Hop Artist</p>
              <p className="text-gray-400 mb-8 max-w-lg">
                Rising star in the hip-hop scene, bringing fresh beats and powerful lyrics to Billion Stars Records. 
                Known for dynamic performances and authentic storytelling that resonates with audiences worldwide.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="text-sm">{social.platform}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section className="py-8 bg-gradient-to-br from-gray-900/50 to-black/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">🎵 Now Playing</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDemoMode 
                  ? "bg-yellow-400/20 border border-yellow-400 text-yellow-400" 
                  : "bg-green-400/20 border border-green-400 text-green-400"
              }`}>
                {isDemoMode ? "DEMO MODE" : "REAL AUDIO"}
              </div>
            </div>
            
            {/* Current Track Display */}
            <div className="bg-gray-900/70 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center transition-all duration-300 ${isPlaying ? 'animate-pulse shadow-lg shadow-green-500/50' : ''}`}>
                  <span className="text-2xl font-bold text-white">{tracks[currentTrack]?.artwork}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{tracks[currentTrack]?.title}</h3>
                  <p className="text-gray-400">{tracks[currentTrack]?.artist}</p>
                  {isPlaying && <p className="text-green-400 text-xs">🎵 Now Playing</p>}
                </div>
                <div className="text-sm text-gray-400">
                  {formatTime(currentTime)} / {tracks[currentTrack]?.duration}
                </div>
              </div>

              {/* Audio Status Info */}
              {isDemoMode ? (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                  <p className="text-yellow-300 text-sm flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    <span>
                      🎵 Demo mode - Real audio not found for this track. Try &quot;The way you are&quot; for real audio!
                    </span>
                  </p>
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                  <p className="text-green-300 text-sm flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    <span>
                      🎧 Real audio playing! Enjoy S.N.U.P.Y C&apos;s music.
                    </span>
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    '--progress': `${duration ? (currentTime / duration) * 100 : 0}%`
                  } as React.CSSProperties}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={prevTrack}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                <button
                  onClick={nextTrack}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer volume-slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                  }}
                />
                <span className="text-xs text-gray-400 min-w-[30px]">{Math.round(volume * 100)}%</span>
              </div>
            </div>

            {/* Playlist */}
            <div className="bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Playlist</h3>
              <div className="space-y-2">
                {tracks.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(index)}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentTrack === index
                        ? "bg-green-600/20 border border-green-600/30"
                        : "bg-gray-800/30 hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{track.artwork}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{track.title}</h4>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                    <div className="text-sm text-gray-400">{track.duration}</div>
                    {currentTrack === index && isPlaying && (
                      <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} preload="metadata" />
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "about", label: "About" },
              { id: "music", label: "Music" },
              { id: "media", label: "Media" },
              { id: "contact", label: "Contact" }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                  selectedSection === section.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* About Section */}
          {selectedSection === "about" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">About S.N.U.P.Y C</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-green-400">Biography</h3>
                  <p className="text-gray-300 mb-4">
                    Snupy Chukz (born Chukwudi Augustine Omoruyi) is a Nigerian artist, songwriter, and creative visionary dedicated to uplifting people through music and culture. Growing up in a musically gifted family in Benin City, Edo State, and later Lagos, he honed his craft through church choirs, freestyle sessions, and live performances before establishing himself as an independent artist under his label, Billion Stars Integrated Solutions Ltd.

His sound blends Afrobeat, Afropop, Reggae, Dancehall, R&B, and World music, creating a universal rhythm that connects across cultures.
                  </p>
                  <p className="text-gray-300">
                   With his debut single “The Way You Are”, a self-love anthem, and his follow-up “Understanding”, a global peace song, Snupy Chukz positions his art as more than entertainment he sees it as a movement for unity, healing, and inspiration.

Beyond music, he is building the SNUPY lifestyle brand, a cultural fraternity and health-conscious movement promoting authenticity and unstoppable energy. His vision is global: to show that African creativity can lead conversations on love, identity, and togetherness, while inspiring the world to dance, reflect, and connect.

Snupy Chukz is not just making songs he is shaping a legacy where African voices meet the world stage with power, purpose, and joy
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-green-400">Musical Style</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Contemporary Hip-Hop</li>
                    <li>• Conscious Rap</li>
                    <li>• Melodic Trap</li>
                    <li>• Lyrical Storytelling</li>
                  </ul>
                  
                  <h3 className="text-xl font-bold mb-4 mt-6 text-green-400">Influences</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Classic Hip-Hop Legends</li>
                    <li>• Modern Rap Innovators</li>
                    <li>• R&amp;B and Soul Artists</li>
                    <li>• Global Music Cultures</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Music Section */}
          {selectedSection === "music" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Music & Releases</h2>
              
              {/* Current Tracks */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-400">Available Tracks</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tracks.map((track, index) => (
                    <div key={track.id} className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-800/50 transition-colors">
                      <div className="aspect-square bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-3xl font-bold text-white">{track.artwork}</span>
                      </div>
                      <h4 className="font-bold mb-1">{track.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{track.artist} • {track.duration}</p>
                      <button 
                        onClick={() => playTrack(index)}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm transition-colors w-full justify-center"
                      >
                        <Play className="h-4 w-4" />
                        <span>Play Track</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Releases */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-400">Upcoming Releases</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {discography.map((release, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-800/50 transition-colors">
                      <div className="aspect-square bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-4xl font-bold text-white">{release.artwork}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{release.title}</h3>
                      <p className="text-gray-400 text-sm mb-1">{release.type} • {release.year}</p>
                      <p className="text-yellow-400 text-sm mb-4">{release.status}</p>
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-2 bg-gray-600 px-3 py-2 rounded-lg text-sm transition-colors cursor-not-allowed opacity-50">
                          <Play className="h-4 w-4" />
                          <span>Preview</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm transition-colors">
                          <Download className="h-4 w-4" />
                          <span>Pre-order</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Placeholder for future releases */}
                  <div className="bg-gray-900/30 border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
                    <Music className="h-12 w-12 text-gray-500 mb-4" />
                    <p className="text-gray-500 text-center">More releases coming soon...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Media Section */}
          {selectedSection === "media" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Media & Press</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-green-400">Press Photos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                        <span className="text-gray-500 text-sm">Photo {i}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-green-400">Videos</h3>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                      <div className="text-center">
                        <Play className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Music Video</p>
                        <p className="text-gray-500 text-xs">Coming Soon</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                      <div className="text-center">
                        <Play className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Behind the Scenes</p>
                        <p className="text-gray-500 text-xs">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          {selectedSection === "contact" && (
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8">
                For booking inquiries, collaborations, or press requests, reach out through the following channels:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-900/50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-green-400">Management</h3>
                  <p className="text-gray-300">Billion Stars Records</p>
                  <p className="text-gray-400 text-sm">management@billionstars.com</p>
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-green-400">Booking</h3>
                  <p className="text-gray-300">Live Performances</p>
                  <p className="text-gray-400 text-sm">booking@billionstars.com</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 px-6 py-3 rounded-lg transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                    <span>{social.username}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}