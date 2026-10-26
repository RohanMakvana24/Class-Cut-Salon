import React, { useEffect, useRef } from 'react';
import {
  GlimmerParticle,
  computeGlimmerFlashIntensity,
  createInitialGlimmerParticles,
} from '../../data/barbershopData';

export interface GlimmerWrapProps {
  children?: React.ReactNode;
  className?: string;
  /** Number of fine drifting glints in the field (default: 88) */
  density?: number;
  /** Drift speed multiplier (default: 1) */
  speed?: number;
  /** Brand color palette for glints [primaryOrange, warmGold, warmIvory] */
  colors?: [string, string, string];
  /** Pause the drifting and flashing animation (e.g. when user clicks Pause Animation) */
  paused?: boolean;
  /** Normalized pointer position [-1, 1] for interactive light-catching */
  pointerNorm?: { x: number; y: number };
}

/**
 * React Bits Pro — Glimmer Wrap (@reactbits-starter/glimmer-wrap-tw)
 * A field of fine glints drifting past, flashing with 4-point specular flares
 * as they catch the warm studio rim light.
 */
export const GlimmerWrap: React.FC<GlimmerWrapProps> = ({
  children,
  className = '',
  density = 88,
  speed = 1,
  colors = ['#F58A16', '#D9A34B', '#F7F1E8'],
  paused = false,
  pointerNorm = { x: 0, y: 0 },
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<GlimmerParticle[]>([]);
  const pointerRef = useRef<{ x: number; y: number }>(pointerNorm);

  useEffect(() => {
    pointerRef.current = pointerNorm;
  }, [pointerNorm]);

  useEffect(() => {
    particlesRef.current = createInitialGlimmerParticles(density);
  }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let lastTimestamp = performance.now();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => resizeCanvas())
        : null;
    if (resizeObserver && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', resizeCanvas);

    const drawStarFlare = (
      x: number,
      y: number,
      armLength: number,
      coreRadius: number,
      rotation: number,
      colorHex: string,
      flashAlpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = flashAlpha;

      // Soft warm bloom around the glint catching light
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, armLength * 1.15);
      grad.addColorStop(0, '#FFFDF9');
      grad.addColorStop(0.28, colorHex);
      grad.addColorStop(1, 'rgba(245, 138, 22, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, armLength * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // 4-point diamond/star glint rays
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      const thickness = Math.max(0.7, coreRadius * 0.52);
      ctx.moveTo(0, -armLength);
      ctx.quadraticCurveTo(thickness, -thickness, armLength, 0);
      ctx.quadraticCurveTo(thickness, thickness, 0, armLength);
      ctx.quadraticCurveTo(-thickness, thickness, -armLength, 0);
      ctx.quadraticCurveTo(-thickness, -thickness, 0, -armLength);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const renderFrame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTimestamp) / 1000));
      lastTimestamp = now;

      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : canvas.width;
      const height = parent ? parent.clientHeight : canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Convert normalized pointer [-1, 1] to [0, 1] stage coordinates
      const ptrX = (pointerRef.current.x + 1) * 0.5;
      const ptrY = (pointerRef.current.y + 1) * 0.5;

      const particles = particlesRef.current;
      const shouldStep = !paused && !prefersReducedMotion;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (shouldStep) {
          p.x = (p.x + p.vx * speed * dt + 1) % 1;
          p.y = (p.y + p.vy * speed * dt + 1) % 1;
          p.flashPhase = (p.flashPhase + p.flashSpeed * speed * dt) % (Math.PI * 2);
        }

        const dx = p.x - ptrX;
        const dy = p.y - ptrY;
        const distNorm = Math.sqrt(dx * dx + dy * dy);

        const { specularFlash, totalAlpha } = computeGlimmerFlashIntensity(
          p.flashPhase,
          p.flashSharpness,
          distNorm
        );

        const px = p.x * width + pointerRef.current.x * p.depth * 10;
        const py = p.y * height + pointerRef.current.y * p.depth * 6;
        const colorHex = colors[p.colorIndex] || colors[0];

        // Draw base drifting pinpoint speck
        ctx.save();
        ctx.globalAlpha = totalAlpha * 0.62;
        ctx.fillStyle = colorHex;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // When the glint catches the light, flash with a crisp fine 4-point specular glint
        if (specularFlash > 0.22) {
          const armLength = (2.4 + p.radius * 2.6) * (0.45 + specularFlash * 0.85);
          drawStarFlare(
            px,
            py,
            armLength,
            p.radius * 0.75,
            p.rotation + specularFlash * 0.3,
            colorHex,
            Math.min(0.95, specularFlash * 0.9)
          );
        }
      }

      if (!paused && !prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    animationFrameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [colors, paused, speed]);

  return (
    <div className={`relative ${className}`}>
      {/* Drifting & Flashing Glimmer Field Canvas Layer */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        data-testid="glimmer-wrap-canvas"
        className="pointer-events-none absolute inset-0 h-full w-full z-[5]"
      />
      {children}
    </div>
  );
};
