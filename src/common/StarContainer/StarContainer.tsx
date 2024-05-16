'use client';

import { gsap } from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

import { Position } from '@/types/Position';
import { cn } from '@/utils/classNames';
import { getDistance } from '@/utils/math';

import { MapperFunction, Star } from './types';

export interface StarContainerProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  densityRatio?: number;
  maxSize?: number;
  minSize?: number;
  minDistance?: number;
  defaultAlpha?: number;
  scaleLimit?: number;
  proximityRatio?: number;
  flickerInterval?: number;
}

const StarContainer: React.FC<Readonly<StarContainerProps>> = ({
  densityRatio = 2,
  maxSize = 1.5,
  minSize = 1,
  minDistance = 5,
  defaultAlpha = 0.3,
  scaleLimit = 1.25,
  proximityRatio = 0.2,
  flickerInterval = 1000,
  className,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const starsRef = useRef<Star[] | null>(null);
  const vminRef = useRef<number | null>(null);
  const scaleMapperRef = useRef<MapperFunction | null>(null);
  const alphaMapperRef = useRef<MapperFunction | null>(null);
  const pointerPositionRef = useRef<Position>({ x: 0, y: 0 });
  const blinkingInterval = useRef<NodeJS.Timeout | null>(null);

  const initializeCanvas = useCallback(() => {
    contextRef.current = canvasRef.current!.getContext('2d');
    vminRef.current = window.innerWidth;

    const STAR_COUNT = Math.floor(vminRef.current * densityRatio);

    scaleMapperRef.current = gsap.utils.mapRange(0, vminRef.current * proximityRatio, scaleLimit, 1);

    alphaMapperRef.current = gsap.utils.mapRange(0, vminRef.current * proximityRatio, 1, defaultAlpha);

    canvasRef.current!.width = window.innerWidth;
    canvasRef.current!.height = window.innerHeight * 2;

    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      let x: number;
      let y: number;

      do {
        x = gsap.utils.random(0, window.innerWidth, 1);
        y = gsap.utils.random(0, window.innerHeight * 2, 1);
      } while (stars.some((star) => getDistance({ x: star.x, y: star.y }, { x, y }) < 15));

      stars.push({
        x,
        y,
        size: gsap.utils.random(minSize, maxSize, 1),
        scale: 0.9,
        alpha: defaultAlpha,
      });
    }

    starsRef.current = stars;

    starsRef.current.forEach((star) => {
      star.initialY = star.y;
    });
  }, [defaultAlpha, densityRatio, proximityRatio, scaleLimit, minSize, maxSize]);

  const renderStars = useCallback(() => {
    const context = contextRef.current!;
    context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    starsRef.current!.forEach((star) => {
      context.fillStyle = `hsla(0, 100%, 100%, ${star.alpha})`;
      context.beginPath();
      context.arc(star.x, star.y, (star.size / 2) * star.scale, 0, Math.PI * 2);
      context.fill();
    });
  }, []);

  const updateStarsByProximity = useCallback(
    ({ x, y }: Position) => {
      pointerPositionRef.current = { x, y };

      starsRef.current!.forEach((star) => {
        const distance = Math.sqrt(Math.pow(star.x - x, 2) + Math.pow(star.y - y, 2));
        const scale = scaleMapperRef.current!(Math.min(distance, vminRef.current! * proximityRatio));
        const alpha = alphaMapperRef.current!(Math.min(distance, vminRef.current! * proximityRatio));

        gsap.to(star, {
          scale,
          alpha,
        });
      });
    },
    [proximityRatio],
  );

  const updateStarsByRandomness = useCallback(
    (decimalPercentage: number) => {
      const { x, y } = pointerPositionRef.current;

      starsRef.current!.forEach((star) => {
        const blinking = Math.random() < decimalPercentage;

        const distance = Math.sqrt(Math.pow(star.x - x, 2) + Math.pow(star.y - y, 2));

        const proximityScale = scaleMapperRef.current!(Math.min(distance, vminRef.current! * proximityRatio));
        const proximityAlpha = alphaMapperRef.current!(Math.min(distance, vminRef.current! * proximityRatio));

        gsap.to(star, {
          scale: blinking ? gsap.utils.random(1, scaleLimit, 0.01) : proximityScale,
          alpha: blinking ? gsap.utils.random(0, 1, 0.01) : proximityAlpha,
        });
      });
    },
    [scaleLimit, proximityRatio],
  );

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    starsRef.current!.forEach((star) => {
      const scrollFactor = window.innerHeight / document.body.clientHeight;
      star.y = star.initialY! - scrollY * scrollFactor;
    });

    updateStarsByProximity({
      x: pointerPositionRef.current!.x,
      y: pointerPositionRef.current!.y,
    });
  }, [updateStarsByProximity]);

  const handleExit = useCallback(() => {
    gsap.to(starsRef.current!, {
      scale: 1,
      alpha: defaultAlpha,
    });
  }, [defaultAlpha]);

  useEffect(() => {
    initializeCanvas();
    updateStarsByRandomness(0.05);

    gsap.ticker.fps(120);
    gsap.ticker.add(renderStars);

    window.addEventListener('resize', initializeCanvas);
    document.addEventListener('pointermove', updateStarsByProximity);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('pointerleave', handleExit);

    const interval = setInterval(() => updateStarsByRandomness(0.5), flickerInterval);
    blinkingInterval.current = interval;

    return () => {
      window.removeEventListener('resize', initializeCanvas);
      document.removeEventListener('pointermove', updateStarsByProximity);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pointerleave', handleExit);

      clearInterval(interval);

      gsap.ticker.remove(renderStars);
    };
  }, [
    scaleLimit,
    minSize,
    maxSize,
    densityRatio,
    proximityRatio,
    defaultAlpha,
    flickerInterval,
    handleExit,
    handleScroll,
    initializeCanvas,
    renderStars,
    updateStarsByProximity,
    updateStarsByRandomness,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-screen h-[200vh] fixed top-0 left-0 -z-1', className)}
      {...rest}
    />
  );
};

export default StarContainer;
