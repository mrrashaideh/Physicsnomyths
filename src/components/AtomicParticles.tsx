import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  duration: number;
  delay: number;
  size: number;
}

export default function AtomicParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 4 + Math.random() * 6,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '110vh', x: `${p.x}vw`, opacity: 0 }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          className="absolute rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}
