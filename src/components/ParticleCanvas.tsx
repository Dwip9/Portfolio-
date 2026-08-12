import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  interactive?: boolean;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      radius: 180
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Sakura petals & floating art sparkles
    const particleCount = Math.min(Math.floor((width * height) / 16000), 65);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: 'petal' | 'sparkle' | 'dot' | 'star';
      color: string;
      alpha: number;
      rotation: number;
      rotSpeed: number;
      sway: number;
      swaySpeed: number;
    }> = [];

    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#e879f9', '#fbbf24'];
    const types: Array<'petal' | 'sparkle' | 'dot' | 'star'> = ['petal', 'petal', 'sparkle', 'dot', 'star'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.5 + 0.2, // Gentle downward drift like floating petals
        size: Math.random() * 6 + 3,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01
      });
    }

    // Helper to draw a Sakura Petal
    const drawPetal = (x: number, y: number, size: number, angle: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size, -size * 1.5, -size * 1.2, -size * 2.8, 0, -size * 3.5);
      ctx.bezierCurveTo(size * 1.2, -size * 2.8, size, -size * 1.5, 0, 0);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.restore();
    };

    // Helper to draw a 4-point Star / Sparkle
    const drawStar = (x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        ctx.lineTo(Math.cos(((i + 0.5) * Math.PI) / 2) * (size * 0.3), Math.sin(((i + 0.5) * Math.PI) / 2) * (size * 0.3));
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse radial glow in soft rose/violet
      if (interactive) {
        const radialGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 2
        );
        radialGlow.addColorStop(0, 'rgba(244, 63, 94, 0.1)');
        radialGlow.addColorStop(0.5, 'rgba(232, 121, 249, 0.04)');
        radialGlow.addColorStop(1, 'rgba(8, 11, 20, 0)');

        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & render floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.sway += p.swaySpeed;
        p.x += p.vx + Math.sin(p.sway) * 0.6;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Wrap around bottom to top
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Draw based on particle type
        if (p.type === 'petal') {
          drawPetal(p.x, p.y, p.size, p.rotation, p.color, p.alpha);
        } else if (p.type === 'star') {
          drawStar(p.x, p.y, p.size * 1.2, p.color, p.alpha);
        } else {
          // Dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
};
