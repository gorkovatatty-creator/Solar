import { useState, useEffect, useRef, useCallback } from 'react';

interface Moon {
  name: string;
  size: number;
  orbitRadius: number;
  duration: number; // seconds
  color: string;
}

interface PlanetData {
  id: string;
  name: string;
  nameRu: string;
  type: string;
  diameter: string;
  distanceFromSun: string;
  orbitalPeriod: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitDuration: number;
  gradient: string;
  description: string;
  hasRing?: boolean;
  moons?: Moon[];
  temperature?: string;
  gravity?: string;
}

const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    nameRu: 'Меркурий',
    type: 'Скалистая планета',
    diameter: '4 879 км',
    distanceFromSun: '57.9 млн км (0.39 а.е.)',
    orbitalPeriod: '88 дней',
    color: '#b5b5b5',
    size: 8,
    orbitRadius: 70,
    orbitDuration: 8,
    gradient: 'radial-gradient(circle at 30% 30%, #d4d4d4, #8a8a8a, #5a5a5a)',
    description: 'Самая маленькая и ближайшая к Солнцу планета. Температура на поверхности колеблется от -180°C до +430°C.',
    temperature: '-180°C до +430°C',
    gravity: '3.7 м/с²',
    moons: []
  },
  {
    id: 'venus',
    name: 'Venus',
    nameRu: 'Венера',
    type: 'Скалистая планета',
    diameter: '12 104 км',
    distanceFromSun: '108.2 млн км (0.72 а.е.)',
    orbitalPeriod: '225 дней',
    color: '#e8c56d',
    size: 12,
    orbitRadius: 105,
    orbitDuration: 14,
    gradient: 'radial-gradient(circle at 30% 30%, #f5dfa0, #e8c56d, #c4943a)',
    description: 'Самая горячая планета с плотной атмосферой из CO₂. Вращается в обратном направлении.',
    temperature: '+462°C (средняя)',
    gravity: '8.87 м/с²',
    moons: []
  },
  {
    id: 'earth',
    name: 'Earth',
    nameRu: 'Земля',
    type: 'Скалистая планета',
    diameter: '12 756 км',
    distanceFromSun: '149.6 млн км (1.0 а.е.)',
    orbitalPeriod: '365.25 дней',
    color: '#4a90d9',
    size: 13,
    orbitRadius: 145,
    orbitDuration: 20,
    gradient: 'radial-gradient(circle at 30% 30%, #7ec8e3, #4a90d9, #2d5f8a)',
    description: 'Наш дом — единственная планета с известной жизнью. 71% поверхности покрыт водой.',
    temperature: '+15°C (средняя)',
    gravity: '9.81 м/с²',
    moons: [
      { name: 'Луна', size: 4, orbitRadius: 18, duration: 4, color: '#ccc' }
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    nameRu: 'Марс',
    type: 'Скалистая планета',
    diameter: '6 792 км',
    distanceFromSun: '227.9 млн км (1.52 а.е.)',
    orbitalPeriod: '687 дней',
    color: '#d45d3a',
    size: 10,
    orbitRadius: 185,
    orbitDuration: 30,
    gradient: 'radial-gradient(circle at 30% 30%, #f0845a, #d45d3a, #8b3520)',
    description: 'Красная планета — цель будущей колонизации. Имеет самую высокую гору — Олимп (21.9 км).',
    temperature: '-63°C (средняя)',
    gravity: '3.72 м/с²',
    moons: [
      { name: 'Фобос', size: 2, orbitRadius: 12, duration: 2, color: '#aaa' },
      { name: 'Деймос', size: 1.5, orbitRadius: 17, duration: 3.5, color: '#999' }
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    nameRu: 'Юпитер',
    type: 'Газовый гигант',
    diameter: '142 984 км',
    distanceFromSun: '778.6 млн км (5.2 а.е.)',
    orbitalPeriod: '11.86 лет',
    color: '#d4a574',
    size: 28,
    orbitRadius: 240,
    orbitDuration: 50,
    gradient: 'radial-gradient(circle at 30% 30%, #f0d4a8, #d4a574, #a07040)',
    description: 'Крупнейшая планета с Большим Красным Пятном — штормом, бушующим более 350 лет.',
    temperature: '-108°C (верхние облака)',
    gravity: '24.79 м/с²',
    moons: [
      { name: 'Ио', size: 3, orbitRadius: 24, duration: 2.5, color: '#e8d44d' },
      { name: 'Европа', size: 2.5, orbitRadius: 30, duration: 4, color: '#c8dce8' },
      { name: 'Ганимед', size: 3.5, orbitRadius: 37, duration: 6, color: '#b8a888' },
      { name: 'Каллисто', size: 3, orbitRadius: 44, duration: 8, color: '#888' }
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    nameRu: 'Сатурн',
    type: 'Газовый гигант',
    diameter: '120 536 км',
    distanceFromSun: '1 433.5 млн км (9.58 а.е.)',
    orbitalPeriod: '29.46 лет',
    color: '#e8d08a',
    size: 24,
    orbitRadius: 305,
    orbitDuration: 75,
    gradient: 'radial-gradient(circle at 30% 30%, #f5e8b8, #e8d08a, #b89850)',
    description: 'Знаменит своими великолепными кольцами из льда и камня. Плотность меньше воды!',
    temperature: '-139°C (верхние облака)',
    gravity: '10.44 м/с²',
    hasRing: true,
    moons: [
      { name: 'Титан', size: 4, orbitRadius: 32, duration: 5, color: '#d4a050' },
      { name: 'Энцелад', size: 2, orbitRadius: 24, duration: 3, color: '#e8e8f0' },
      { name: 'Рея', size: 2.5, orbitRadius: 38, duration: 6.5, color: '#bbb' }
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    nameRu: 'Уран',
    type: 'Ледяной гигант',
    diameter: '51 118 км',
    distanceFromSun: '2 872.5 млн км (19.2 а.е.)',
    orbitalPeriod: '84.01 лет',
    color: '#7ec8c8',
    size: 18,
    orbitRadius: 365,
    orbitDuration: 100,
    gradient: 'radial-gradient(circle at 30% 30%, #a8e8e8, #7ec8c8, #4a9090)',
    description: 'Вращается «на боку» — ось наклонена на 98°. Самая холодная планетарная атмосфера (-224°C).',
    temperature: '-224°C (минимум)',
    gravity: '8.87 м/с²',
    moons: [
      { name: 'Титания', size: 2.5, orbitRadius: 22, duration: 4, color: '#ccc' },
      { name: 'Оберон', size: 2, orbitRadius: 28, duration: 5.5, color: '#aaa' }
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    nameRu: 'Нептун',
    type: 'Ледяной гигант',
    diameter: '49 528 км',
    distanceFromSun: '4 495.1 млн км (30.07 а.е.)',
    orbitalPeriod: '164.8 лет',
    color: '#4466cc',
    size: 17,
    orbitRadius: 420,
    orbitDuration: 130,
    gradient: 'radial-gradient(circle at 30% 30%, #6688ee, #4466cc, #223388)',
    description: 'Самая далёкая планета с сильнейшими ветрами в системе — до 2 100 км/ч.',
    temperature: '-218°C',
    gravity: '11.15 м/с²',
    moons: [
      { name: 'Тритон', size: 3, orbitRadius: 24, duration: 4, color: '#b8c8d8' }
    ]
  }
];

function generateStars(count: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    });
  }
  return stars;
}

const stars = generateStars(300);

function MoonOrbit({ moon }: { moon: Moon }) {
  const moonAngleRef = useRef(Math.random() * 360);
  const moonOrbitRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [isPlaying] = useState(true);

  useEffect(() => {
    const animateMoon = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (isPlaying) {
        const angularSpeed = (360 / (moon.duration * 1000));
        moonAngleRef.current = (moonAngleRef.current + angularSpeed * delta) % 360;
        if (moonOrbitRef.current) {
          moonOrbitRef.current.style.transform = `translate(-50%, -50%) rotate(${moonAngleRef.current}deg)`;
        }
      }
      animRef.current = requestAnimationFrame(animateMoon);
    };
    animRef.current = requestAnimationFrame(animateMoon);
    return () => cancelAnimationFrame(animRef.current);
  }, [moon.duration, isPlaying]);

  return (
    <div
      className="moon-orbit-path"
      style={{
        width: `${moon.orbitRadius * 2}px`,
        height: `${moon.orbitRadius * 2}px`,
      }}
    >
      <div
        ref={moonOrbitRef}
        className="moon-orbit-container"
        style={{
          width: `${moon.orbitRadius * 2}px`,
          height: `${moon.orbitRadius * 2}px`,
        }}
      >
        <div
          className="moon-body"
          style={{
            width: `${moon.size}px`,
            height: `${moon.size}px`,
            background: `radial-gradient(circle at 30% 30%, ${moon.color}, ${moon.color}88)`,
          }}
          title={moon.name}
        >
          <span className="moon-label">{moon.name}</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const anglesRef = useRef<number[]>(planets.map(() => Math.random() * 360));
  
  // Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMoonLabels, setShowMoonLabels] = useState(false);

  const MIN_ZOOM = 0.3;
  const MAX_ZOOM = 8;

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev * delta));
      return newZoom;
    });
  }, []);

  // Handle touch pinch zoom
  const lastTouchDistRef = useRef<number>(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistRef.current = Math.sqrt(dx * dx + dy * dy);
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...pan };
    }
  }, [pan]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (lastTouchDistRef.current > 0) {
        const scale = dist / lastTouchDistRef.current;
        setZoom(prev => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev * scale)));
      }
      lastTouchDistRef.current = dist;
    } else if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy
      });
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastTouchDistRef.current = 0;
  }, []);

  // Mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0 && (e.target as HTMLElement).closest('.solar-system-area')) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      panStartRef.current = { ...pan };
    }
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy
      });
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Auto-show moons and labels based on zoom level
  const [showMoons, setShowMoons] = useState(false);
  useEffect(() => {
    setShowMoons(zoom >= 1.5);
    setShowMoonLabels(zoom >= 3);
  }, [zoom]);

  const handlePlanetClick = (planet: PlanetData) => {
    if (selectedPlanet?.id === planet.id) {
      setSelectedPlanet(null);
      setShowInfo(false);
    } else {
      setSelectedPlanet(planet);
      setShowInfo(true);
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(MAX_ZOOM, prev * 1.3));
  const zoomOut = () => setZoom(prev => Math.max(MIN_ZOOM, prev / 1.3));
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (isPlaying) {
      planets.forEach((planet, index) => {
        const angularSpeed = (360 / (planet.orbitDuration * 1000)) * speed;
        anglesRef.current[index] = (anglesRef.current[index] + angularSpeed * delta) % 360;
        
        if (orbitRefs.current[index]) {
          orbitRefs.current[index]!.style.transform = `translate(-50%, -50%) rotate(${anglesRef.current[index]}deg)`;
        }
      });
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying, speed]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate]);

  useEffect(() => {
    planets.forEach((_, index) => {
      if (orbitRefs.current[index]) {
        orbitRefs.current[index]!.style.transform = `translate(-50%, -50%) rotate(${anglesRef.current[index]}deg)`;
      }
    });
  }, []);

  return (
    <div 
      className="solar-system-container" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Stars background (fixed, not affected by zoom) */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Zoomable & pannable solar system area */}
      <div 
        className="solar-system-area" 
        style={{ 
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {/* Sun */}
        <div 
          className="sun" 
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPlanet({
              id: 'sun',
              name: 'Sun',
              nameRu: 'Солнце',
              type: 'Жёлтый карлик (G2V)',
              diameter: '1 392 700 км',
              distanceFromSun: '—',
              orbitalPeriod: '—',
              color: '#ffcc00',
              size: 60,
              orbitRadius: 0,
              orbitDuration: 0,
              gradient: 'radial-gradient(circle at 30% 30%, #fff7a0, #ffcc00, #ff8800)',
              description: 'Звезда в центре нашей системы. Содержит 99.86% всей массы Солнечной системы. Возраст — около 4.6 млрд лет.',
              moons: []
            });
            setShowInfo(true);
          }} 
        />

        {/* Orbit paths and planets */}
        {planets.map((planet, index) => (
          <div key={planet.id}>
            {/* Orbit path */}
            <div
              className="orbit-path"
              style={{
                width: `${planet.orbitRadius * 2}px`,
                height: `${planet.orbitRadius * 2}px`,
              }}
            />
            {/* Orbit container (rotates) */}
            <div
              ref={(el) => { orbitRefs.current[index] = el; }}
              className="orbit-container"
              style={{
                width: `${planet.orbitRadius * 2}px`,
                height: `${planet.orbitRadius * 2}px`,
              }}
            >
              {/* Planet wrapper (counter-rotates to keep upright) */}
              <div
                className={`planet-wrapper ${selectedPlanet?.id === planet.id ? 'selected' : ''}`}
                style={{
                  right: '0',
                  top: '50%',
                  transform: `translate(50%, -50%)`,
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanetClick(planet);
                }}
              >
                {/* Planet */}
                <div
                  className="planet"
                  style={{
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                    background: planet.gradient,
                    boxShadow: `0 0 ${planet.size / 2}px ${planet.color}40`,
                  }}
                >
                  {planet.hasRing && <div className="saturn-ring" />}
                  <div className="planet-label">{planet.nameRu}</div>
                </div>

                {/* Moons */}
                {planet.moons && planet.moons.length > 0 && (
                  <div className={`moons-container ${showMoons ? 'visible' : ''} ${showMoonLabels ? 'show-labels' : ''}`}>
                    {planet.moons.map((moon, mIdx) => (
                      <MoonOrbit key={mIdx} moon={moon} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="title-panel">
        <h1>🌌 Солнечная Система</h1>
        <p>Колёсико мыши — масштаб • Перетаскивание — перемещение</p>
      </div>

      {/* Zoom indicator */}
      <div className="zoom-indicator">
        <span>{Math.round(zoom * 100)}%</span>
      </div>

      {/* Info Panel */}
      <div className={`info-panel ${showInfo && selectedPlanet ? '' : 'hidden'}`}>
        {selectedPlanet && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div
                style={{
                  width: selectedPlanet.id === 'sun' ? '40px' : '28px',
                  height: selectedPlanet.id === 'sun' ? '40px' : '28px',
                  borderRadius: '50%',
                  background: selectedPlanet.id === 'sun'
                    ? 'radial-gradient(circle at 30% 30%, #fff7a0, #ffcc00, #ff8800)'
                    : selectedPlanet.gradient,
                  boxShadow: `0 0 12px ${selectedPlanet.color}60`,
                  flexShrink: 0,
                }}
              />
              <div>
                <h2>{selectedPlanet.nameRu}</h2>
                <div className="planet-type">{selectedPlanet.type}</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px', lineHeight: '1.5' }}>
              {selectedPlanet.description}
            </p>
            <div className="info-row">
              <span className="info-label">📏 Диаметр</span>
              <span className="info-value">{selectedPlanet.diameter}</span>
            </div>
            <div className="info-row">
              <span className="info-label">📍 От Солнца</span>
              <span className="info-value">{selectedPlanet.distanceFromSun}</span>
            </div>
            <div className="info-row">
              <span className="info-label">🔄 Орбит. период</span>
              <span className="info-value">{selectedPlanet.orbitalPeriod}</span>
            </div>
            {selectedPlanet.temperature && (
              <div className="info-row">
                <span className="info-label">🌡️ Температура</span>
                <span className="info-value">{selectedPlanet.temperature}</span>
              </div>
            )}
            {selectedPlanet.gravity && (
              <div className="info-row">
                <span className="info-label">⚖️ Гравитация</span>
                <span className="info-value">{selectedPlanet.gravity}</span>
              </div>
            )}
            {selectedPlanet.moons && selectedPlanet.moons.length > 0 && (
              <div className="info-row">
                <span className="info-label">🌙 Спутники</span>
                <span className="info-value">{selectedPlanet.moons.map(m => m.name).join(', ')}</span>
              </div>
            )}
            <button
              onClick={() => { setSelectedPlanet(null); setShowInfo(false); }}
              className="close-btn"
            >
              ✕ Закрыть
            </button>
          </>
        )}
      </div>

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button className="zoom-btn" onClick={zoomIn} title="Приблизить">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button className="zoom-btn" onClick={zoomOut} title="Отдалить">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </button>
        <button className="zoom-btn" onClick={resetView} title="Сбросить вид">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
      </div>

      {/* Playback Controls */}
      <div className="controls-panel">
        <button
          className={`control-btn ${isPlaying ? 'active' : ''}`}
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? 'Пауза' : 'Воспроизведение'}
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>

        <button
          className="control-btn"
          onClick={() => {
            anglesRef.current = planets.map((_, i) => (i * 45) % 360);
          }}
          title="Сбросить позиции"
        >
          🔄
        </button>

        <div className="speed-control">
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>0.1×</span>
          <input
            type="range"
            className="speed-slider"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>5×</span>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: 700, 
            color: '#6496ff',
            minWidth: '40px',
            textAlign: 'center'
          }}>
            {speed.toFixed(1)}×
          </span>
        </div>

        <button
          className="control-btn"
          onClick={() => setSpeed(1)}
          title="Сбросить скорость"
        >
          ↺
        </button>
      </div>
    </div>
  );
}

export default App;
