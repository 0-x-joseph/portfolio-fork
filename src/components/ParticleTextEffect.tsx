import React, { useEffect, useRef } from 'react';

interface Vector2D {
  x: number;
  y: number;
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 };
  vel: Vector2D = { x: 0, y: 0 };
  acc: Vector2D = { x: 0, y: 0 };
  target: Vector2D = { x: 0, y: 0 };

  closeEnoughTarget = 100;
  maxSpeed = 1.0;
  maxForce = 0.1;
  particleSize = 10;
  isKilled = false;

  startColor = { r: 0, g: 0, b: 0 };
  targetColor = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  colorBlendRate = 0.01;

  move() {
    let proximityMult = 1;
    const distance = Math.hypot(this.pos.x - this.target.x, this.pos.y - this.target.y);
    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    };

    const magnitude = Math.hypot(towardsTarget.x, towardsTarget.y);
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult;
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult;
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    };

    const steerMagnitude = Math.hypot(steer.x, steer.y);
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    };

    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    if (drawAsPoints) {
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
      return;
    }

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  kill(width: number, height: number) {
    if (this.isKilled) return;

    const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2);
    this.target.x = randomPos.x;
    this.target.y = randomPos.y;

    this.startColor = {
      r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
      g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
      b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
    };
    this.targetColor = { r: 0, g: 0, b: 0 };
    this.colorWeight = 0;

    this.isKilled = true;
  }

  private generateRandomPos(x: number, y: number, mag: number): Vector2D {
    const randomX = Math.random() * 1000;
    const randomY = Math.random() * 500;

    const direction = {
      x: randomX - x,
      y: randomY - y,
    };

    const magnitude = Math.hypot(direction.x, direction.y);
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag;
      direction.y = (direction.y / magnitude) * mag;
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    };
  }
}

interface ParticleTextEffectProps {
  words?: string[];
  className?: string;
  onComplete?: () => void;
}

const DEFAULT_WORDS = ['WELCOME\nTO MY PORTFOLIO'];
const COLOR_PALETTE = [
  { r: 99, g: 102, b: 241 },
  { r: 244, g: 63, b: 94 },
  { r: 34, g: 211, b: 238 },
  { r: 245, g: 245, b: 247 },
];

export function ParticleTextEffect({ words = DEFAULT_WORDS, className, onComplete }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);
  const stableFramesRef = useRef(0);
  const didCompleteRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const pixelSteps = 8;
  const drawAsPoints = true;

  const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
    const randomX = Math.random() * 1000;
    const randomY = Math.random() * 500;

    const direction = {
      x: randomX - x,
      y: randomY - y,
    };

    const magnitude = Math.hypot(direction.x, direction.y);
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag;
      direction.y = (direction.y / magnitude) * mag;
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    };
  };

  const drawWordToCanvas = (word: string, canvas: HTMLCanvasElement) => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (!offscreenCtx) return null;

    const lines = word.split('\n');
    offscreenCtx.clearRect(0, 0, canvas.width, canvas.height);
    offscreenCtx.fillStyle = 'white';
    offscreenCtx.textAlign = 'center';
    offscreenCtx.textBaseline = 'middle';

    let fontSize = Math.min(120, Math.max(42, canvas.width / 6));
    offscreenCtx.font = `800 ${fontSize}px "Space Grotesk", "IBM Plex Sans", sans-serif`;

    const getMaxLineWidth = () =>
      Math.max(...lines.map((line) => offscreenCtx.measureText(line).width));

    let maxWidth = getMaxLineWidth();
    while (maxWidth > canvas.width * 0.85 && fontSize > 32) {
      fontSize -= 4;
      offscreenCtx.font = `800 ${fontSize}px "Space Grotesk", "IBM Plex Sans", sans-serif`;
      maxWidth = getMaxLineWidth();
    }

    const lineHeight = fontSize * 1.1;
    const totalHeight = lineHeight * lines.length;
    const startY = canvas.height / 2 - totalHeight / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
      offscreenCtx.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });

    return offscreenCtx.getImageData(0, 0, canvas.width, canvas.height);
  };

  const nextWord = (word: string, canvas: HTMLCanvasElement) => {
    const imageData = drawWordToCanvas(word, canvas);
    if (!imageData) return;

    const pixels = imageData.data;
    const newColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    const particles = particlesRef.current;
    let particleIndex = 0;

    const coordsIndexes: number[] = [];
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i);
    }

    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]];
    }

    for (const coordIndex of coordsIndexes) {
      const alpha = pixels[coordIndex + 3];
      if (alpha <= 0) continue;

      const x = (coordIndex / 4) % canvas.width;
      const y = Math.floor(coordIndex / 4 / canvas.width);

      let particle: Particle;
      if (particleIndex < particles.length) {
        particle = particles[particleIndex];
        particle.isKilled = false;
        particleIndex += 1;
      } else {
        particle = new Particle();

        const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2);
        particle.pos.x = randomPos.x;
        particle.pos.y = randomPos.y;

        particle.maxSpeed = Math.random() * 3 + 2;
        particle.maxForce = particle.maxSpeed * 0.04;
        particle.particleSize = Math.random() * 4 + 4;
        particle.colorBlendRate = Math.random() * 0.02 + 0.005;

        particles.push(particle);
        particleIndex += 1;
      }

      particle.startColor = {
        r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
        g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
        b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
      };
      particle.targetColor = newColor;
      particle.colorWeight = 0;

      particle.target.x = x;
      particle.target.y = y;
    }

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height);
    }
  };

  const resizeCanvas = (canvas: HTMLCanvasElement) => {
    const width = Math.min(1000, Math.max(320, window.innerWidth * 0.86));
    const height = Math.min(420, Math.max(220, window.innerHeight * 0.32));
    const nextWidth = Math.floor(width);
    const nextHeight = Math.floor(height);

    if (canvas.width === nextWidth && canvas.height === nextHeight) {
      return false;
    }

    canvas.width = nextWidth;
    canvas.height = nextHeight;
    return true;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isActive = true;
    frameCountRef.current = 0;
    wordIndexRef.current = 0;

    const handleResize = () => {
      if (resizeCanvas(canvas)) {
        nextWord(words[wordIndexRef.current] ?? words[0], canvas);
      }
    };

    handleResize();
    nextWord(words[0], canvas);

    const animate = () => {
      if (!isActive) return;

      ctx.fillStyle = 'rgba(3, 3, 3, 0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      let settledCount = 0;
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.move();
        particle.draw(ctx, drawAsPoints);

        const speed = Math.hypot(particle.vel.x, particle.vel.y);
        const distance = Math.hypot(particle.pos.x - particle.target.x, particle.pos.y - particle.target.y);
        if (distance < 2.5 && speed < 0.35) {
          settledCount += 1;
        }

        if (particle.isKilled) {
          if (
            particle.pos.x < 0 ||
            particle.pos.x > canvas.width ||
            particle.pos.y < 0 ||
            particle.pos.y > canvas.height
          ) {
            particles.splice(i, 1);
          }
        }
      }

      if (!didCompleteRef.current && particles.length > 0 && frameCountRef.current > 90) {
        const settledRatio = settledCount / particles.length;
        if (settledRatio > 0.9) {
          stableFramesRef.current += 1;
        } else {
          stableFramesRef.current = 0;
        }

        if (stableFramesRef.current > 30) {
          didCompleteRef.current = true;
          onCompleteRef.current?.();
        }
      }

      frameCountRef.current += 1;
      if (words.length > 1 && frameCountRef.current % 240 === 0) {
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
        nextWord(words[wordIndexRef.current], canvas);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      isActive = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [words]);

  return (
    <div className={`mx-auto w-full max-w-[1000px] ${className ?? ''}`}>
      <canvas
        ref={canvasRef}
        className="w-full rounded-[28px] bg-black/70 shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
        style={{ height: 'auto' }}
      />
    </div>
  );
}
