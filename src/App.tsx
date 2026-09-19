import { useState, useEffect, useRef, useCallback } from 'react';

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
  moons?: number;
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
    moons: 0
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
    moons: 0
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
    moons: 1
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
    moons: 2
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
    moons: 95
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
    hasRing: true,
    moons: 146
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
    moons: 28
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
    moons: 16
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

const stars = generateStars(250);

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const anglesRef = useRef<number[]>(planets.map(() => Math.random() * 360));
  const [viewScale, setViewScale] = useState(1);

  // Auto-scale based on viewport
  useEffect(() => {
    const updateScale = () => {
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      const neededSize = 900;
      const newScale = Math.min(1, (minDim - 60) / neededSize);
      setViewScale(newScale);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handlePlanetClick = (planet: PlanetData) => {
    if (selectedPlanet?.id === planet.id) {
      setSelectedPlanet(null);
      setShowInfo(false);
    } else {
      setSelectedPlanet(planet);
      setShowInfo(true);
    }
  };

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
    planets.forEach((planet, index) => {
      if (orbitRefs.current[index]) {
        orbitRefs.current[index]!.style.transform = `translate(-50%, -50%) rotate(${anglesRef.current[index]}deg)`;
      }
    });
  }, []);

  return (
    <div className="solar-system-container">
      {/* Stars background */}
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

      {/* Scaled solar system area */}
      <div className="solar-system-area" style={{ transform: `scale(${viewScale})` }}>
        {/* Sun */}
        <div 
          className="sun" 
          onClick={() => {
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
              moons: 0
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
              {/* Planet */}
              <div
                className={`planet ${selectedPlanet?.id === planet.id ? 'selected' : ''}`}
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                  background: planet.gradient,
                  boxShadow: `0 0 ${planet.size / 2}px ${planet.color}40`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanetClick(planet);
                }}
              >
                {planet.hasRing && <div className="saturn-ring" />}
                <div className="planet-label">{planet.nameRu}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="title-panel">
        <h1>🌌 Солнечная Система</h1>
        <p>Нажмите на планету для подробной информации</p>
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
            {selectedPlanet.moons !== undefined && (
              <div className="info-row">
                <span className="info-label">🌙 Спутники</span>
                <span className="info-value">{selectedPlanet.moons}</span>
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

      {/* Controls */}
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
