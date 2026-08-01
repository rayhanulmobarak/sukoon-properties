import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  RotateCw,
  Maximize2,
  Minimize2,
  Compass,
  Eye,
  Layers,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Camera,
  Info,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface VirtualTourViewerProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

interface Hotspot {
  id: string;
  xPercent: number; // 0 to 100 relative to horizontal pan range
  yPercent: number; // 0 to 100 relative to vertical frame
  title: string;
  description: string;
  badge?: string;
  icon?: string;
}

interface RoomScene {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  nightImageUrl: string;
  thumbnail: string;
  description: string;
  hotspots: Hotspot[];
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: 'living',
    name: 'Luxury Grand Living Room',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
    description: '14ft High Ceiling with Italian Carrara Marble Flooring and Smart Lighting Controls',
    hotspots: [
      {
        id: 'h1',
        xPercent: 28,
        yPercent: 42,
        title: 'Italian Carrara Marble',
        description: 'First-grade imported 4x4 ft polished Carrara marble with acoustic underlayment.',
        badge: 'Premium Finish',
      },
      {
        id: 'h2',
        xPercent: 62,
        yPercent: 35,
        title: 'Floor-to-Ceiling Panoramic Glass',
        description: 'Double-glazed thermal-break aluminum windows with UV and acoustic dampening coating.',
        badge: 'Soundproof',
      },
      {
        id: 'h3',
        xPercent: 82,
        yPercent: 58,
        title: 'Integrated Smart Home Panel',
        description: 'Schneider Electric touch automation for HVAC, ambient lighting, and electronic lock access.',
        badge: 'Smart Automation',
      },
    ],
  },
  {
    id: 'suite',
    name: 'Executive Master Suite',
    category: 'Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=300&q=80',
    description: 'Spacious Master Bedroom with Private Sunset Balcony and En-Suite Jacuzzi',
    hotspots: [
      {
        id: 'h4',
        xPercent: 35,
        yPercent: 48,
        title: 'Burma Teak Wood Detailing',
        description: 'Solid seasoned Burma teak wood wall accent paneling with concealed LED mood strip.',
        badge: 'Natural Wood',
      },
      {
        id: 'h5',
        xPercent: 70,
        yPercent: 52,
        title: 'Private Sunset Balcony Access',
        description: 'Seamless glass sliding door leading to private 120 sq.ft sunrise/sunset view terrace.',
        badge: 'Scenic Terrace',
      },
    ],
  },
  {
    id: 'terrace',
    name: 'Rooftop Infinity Skyline View',
    category: 'Skyline Terrace',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80',
    description: '360° Unobstructed Skyline View of Gulshan Lake & Purbachal Expressway',
    hotspots: [
      {
        id: 'h6',
        xPercent: 45,
        yPercent: 30,
        title: 'Gulshan Lake Frontage',
        description: 'Direct line-of-sight across 100-acre serene waterbody and green parkways.',
        badge: 'Waterfront',
      },
      {
        id: 'h7',
        xPercent: 75,
        yPercent: 65,
        title: 'Solar Micro-Grid System',
        description: 'Rooftop solar panel integration powering 40% of common building illumination.',
        badge: 'Eco Green',
      },
    ],
  },
  {
    id: 'purbachal',
    name: 'Purbachal Plot Site Perimeter (360 Boundary)',
    category: 'Land Plot',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80',
    description: 'Sector 22 Demarcated Corner Plot with 60ft Front Road & RAJUK Boundary Demarcation',
    hotspots: [
      {
        id: 'h8',
        xPercent: 22,
        yPercent: 55,
        title: 'RAJUK Boundary Pillar #42',
        description: 'Physical CS/RS mutation pillar certified by Dhaka Land Office & RAJUK inspectors.',
        badge: '100% Legal',
      },
      {
        id: 'h9',
        xPercent: 68,
        yPercent: 40,
        title: 'Purbachal Expressway Access',
        description: 'Only 4 minutes drive from 300ft Expressway interchange via 60ft wide paved avenue.',
        badge: '60ft Avenue',
      },
    ],
  },
];

export const VirtualTourViewer: React.FC<VirtualTourViewerProps> = ({
  isOpen,
  onClose,
  propertyTitle = 'Sukoon Signature Property',
}) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentScene = ROOM_SCENES[activeRoomIndex];

  // Auto Rotation effect
  useEffect(() => {
    let animationFrame: number;
    if (isAutoRotating && !isDragging) {
      const step = () => {
        setPanX((prev) => (prev + 0.15) % 360);
        animationFrame = requestAnimationFrame(step);
      };
      animationFrame = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoRotating, isDragging]);

  // Audio Ambient Synthesizer
  const toggleAmbientAudio = useCallback(() => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Create warm subtle ambient drone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(174, ctx.currentTime); // 174Hz Solfeggio healing frequency
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlayingAudio(true);
      } catch (err) {
        console.error('Audio playback error', err);
      }
    } else {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.5);
        setTimeout(() => {
          oscillatorRef.current?.stop();
          audioContextRef.current?.close();
          audioContextRef.current = null;
          setIsPlayingAudio(false);
        }, 500);
      } else {
        setIsPlayingAudio(false);
      }
    }
  }, [isPlayingAudio]);

  // Cleanup audio on unmount or close
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  if (!isOpen) return null;

  // Drag controls
  const handleStartDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartRef.current = { x: clientX, y: clientY };
    panStartRef.current = { x: panX, y: panY };
  };

  const handleMoveDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    // Pan X wraps 0-360 deg
    const newPanX = (panStartRef.current.x + deltaX * 0.25) % 360;
    // Pan Y bounded pitch -25 to +25 deg
    const newPanY = Math.max(-25, Math.min(25, panStartRef.current.y + deltaY * 0.15));

    setPanX(newPanX);
    setPanY(newPanY);
  };

  const handleEndDrag = () => {
    setIsDragging(false);
  };

  // Touch Events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.8, Math.min(2.5, prev + delta)));
  };

  const handleTakeSnapshot = () => {
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
      setIsFullscreen(false);
    }
  };

  // Heading orientation calculation
  const normalizedAngle = Math.round(((panX % 360) + 360) % 360);
  const getDirectionText = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return 'N (North)';
    if (deg >= 22.5 && deg < 67.5) return 'NE (North-East)';
    if (deg >= 67.5 && deg < 112.5) return 'E (East)';
    if (deg >= 112.5 && deg < 157.5) return 'SE (South-East)';
    if (deg >= 157.5 && deg < 202.5) return 'S (South)';
    if (deg >= 202.5 && deg < 247.5) return 'SW (South-West)';
    if (deg >= 247.5 && deg < 292.5) return 'W (West)';
    return 'NW (North-West)';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div
        ref={containerRef}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-6xl w-full overflow-hidden shadow-2xl flex flex-col h-[90vh] relative"
      >
        {/* Top Floating Control Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-emerald-900/40 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-amber-300 flex items-center justify-center shadow-lg border border-emerald-400/40">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase">
                  360° Panorama Virtual Tour
                </span>
                <span className="text-[11px] text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/20 hidden sm:inline">
                  Interactive Hotspots Enabled
                </span>
              </div>
              <h3 className="text-white font-serif font-bold text-sm sm:text-base truncate max-w-md">
                {propertyTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Ambient Audio Toggle */}
            <button
              onClick={toggleAmbientAudio}
              className={`p-2.5 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
                isPlayingAudio
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle Ambient Sound"
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline">{isPlayingAudio ? 'Sound ON' : 'Ambient Sound'}</span>
            </button>

            {/* Night / Day Lighting Filter */}
            <button
              onClick={() => setIsNightMode((prev) => !prev)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 rounded-xl transition text-xs font-semibold flex items-center gap-1"
              title="Toggle Day/Night Atmosphere"
            >
              {isNightMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span className="hidden md:inline">{isNightMode ? 'Night View' : 'Daylight'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 border border-transparent hover:border-slate-700 transition"
              title="Close Virtual Tour"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 360 Interactive Panorama Viewport */}
        <div
          onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMoveDrag(e.clientX, e.clientY)}
          onMouseUp={handleEndDrag}
          onMouseLeave={handleEndDrag}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEndDrag}
          className="relative flex-1 bg-black overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          {/* Panoramic Image Stage with horizontal pan & pitch */}
          <div
            className="w-full h-full relative transition-transform duration-75 ease-out"
            style={{
              transform: `scale(${zoomLevel}) translateY(${panY * 2}px)`,
            }}
          >
            {/* Double image for seamless 360 panorama feel */}
            <div
              className="absolute inset-0 w-[200%] h-full flex"
              style={{
                transform: `translateX(-${(panX % 100) * 0.5}%)`,
              }}
            >
              <img
                src={isNightMode ? currentScene.nightImageUrl : currentScene.imageUrl}
                alt={currentScene.name}
                className="w-1/2 h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src={isNightMode ? currentScene.nightImageUrl : currentScene.imageUrl}
                alt={currentScene.name}
                className="w-1/2 h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Interactive Hotspots Overlaid on Panorama */}
            {currentScene.hotspots.map((hotspot) => {
              // Calculate adjusted position considering horizontal pan angle
              const adjustedX = (hotspot.xPercent + (panX * 0.2)) % 100;

              return (
                <div
                  key={hotspot.id}
                  style={{
                    left: `${adjustedX}%`,
                    top: `${hotspot.yPercent}%`,
                  }}
                  className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 group"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(hotspot);
                    }}
                    className="relative flex items-center justify-center p-2 rounded-full bg-amber-500 text-slate-950 font-bold shadow-xl border-2 border-white hover:scale-125 transition duration-300 animate-pulse"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                  </button>

                  {/* Hover Tooltip Preview */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-40 w-48">
                    <div className="bg-slate-950/90 text-white text-[11px] p-2.5 rounded-xl border border-amber-400/40 shadow-xl space-y-1 text-center backdrop-blur-md">
                      {hotspot.badge && (
                        <span className="text-[9px] bg-amber-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded uppercase">
                          {hotspot.badge}
                        </span>
                      )}
                      <h5 className="font-bold text-amber-200">{hotspot.title}</h5>
                      <p className="text-[10px] text-slate-300 line-clamp-2">{hotspot.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compass & Direction Gauge */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-xl z-20">
            <Compass className="w-5 h-5 text-emerald-400" style={{ transform: `rotate(${normalizedAngle}deg)` }} />
            <div>
              <div className="text-[10px] text-slate-400 font-mono">PANORAMA DIRECTION</div>
              <div className="text-amber-300 font-bold text-xs">{normalizedAngle}° {getDirectionText(normalizedAngle)}</div>
            </div>
          </div>

          {/* Drag Instruction Banner */}
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-2xl text-xs font-medium shadow-xl hidden sm:flex items-center gap-2 z-20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Drag mouse/finger 360° | Zoom ({zoomLevel.toFixed(1)}x)</span>
          </div>

          {/* Floating On-Screen Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
            <button
              onClick={() => handleZoom(0.2)}
              className="p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-2xl border border-slate-700 shadow-xl backdrop-blur-md transition"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleZoom(-0.2)}
              className="p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-2xl border border-slate-700 shadow-xl backdrop-blur-md transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAutoRotating((prev) => !prev)}
              className={`p-3 rounded-2xl border shadow-xl backdrop-blur-md transition ${
                isAutoRotating
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700'
              }`}
              title={isAutoRotating ? 'Pause Auto-Pan' : 'Start Auto 360 Pan'}
            >
              {isAutoRotating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={handleTakeSnapshot}
              className="p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-2xl border border-slate-700 shadow-xl backdrop-blur-md transition relative"
              title="Take View Snapshot"
            >
              <Camera className="w-5 h-5 text-amber-300" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-2xl border border-slate-700 shadow-xl backdrop-blur-md transition"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Toast Notification when taking snapshot */}
          {copiedMessage && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-2xl shadow-2xl border border-emerald-300 flex items-center gap-2 z-40 animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>360° Tour View Snapshot Saved to Clipboard!</span>
            </div>
          )}

          {/* Selected Hotspot Detailed Modal */}
          {selectedHotspot && (
            <div className="absolute inset-x-4 bottom-24 sm:bottom-28 max-w-lg mx-auto bg-slate-950/95 border border-amber-400/50 p-5 rounded-3xl text-white shadow-2xl z-40 backdrop-blur-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">
                    {selectedHotspot.badge || 'Architectural Spec'}
                  </span>
                  <h4 className="font-serif font-bold text-base text-amber-300">{selectedHotspot.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-light">{selectedHotspot.description}</p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> RAJUK & Sukoon Verified Standard
                </span>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-amber-300 hover:underline font-bold"
                >
                  Close Spec
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Scene Thumbnail Selector & Navigation Toolbar */}
        <div className="bg-slate-950 p-3 sm:p-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 z-20">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="font-extrabold uppercase tracking-wider text-[11px] text-slate-300">
              Scenes ({activeRoomIndex + 1}/{ROOM_SCENES.length}):
            </span>
          </div>

          {/* Thumbnail List */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 px-1">
            {ROOM_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveRoomIndex(idx);
                  setSelectedHotspot(null);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl transition border text-left flex-shrink-0 ${
                  activeRoomIndex === idx
                    ? 'bg-emerald-950 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <img
                  src={scene.thumbnail}
                  alt={scene.name}
                  className="w-8 h-8 rounded-xl object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-[10px] text-amber-300 font-mono uppercase">{scene.category}</div>
                  <div className="text-xs font-bold truncate max-w-[120px]">{scene.name}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Pan Rotation Quick Controls */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setPanX((prev) => prev - 45)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5 text-emerald-400 transform -scale-x-100" /> -45°
            </button>
            <button
              onClick={() => setPanX((prev) => prev + 45)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5 text-emerald-400" /> +45°
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
