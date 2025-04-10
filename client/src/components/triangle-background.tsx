import { useEffect, useRef } from "react";
import { createCirclesAnimation } from "@/lib/animation";

export default function CircleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const cleanup = createCirclesAnimation(canvasRef.current);
    
    return () => {
      cleanup();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
}
