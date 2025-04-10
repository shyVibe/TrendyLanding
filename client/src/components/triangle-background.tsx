import { useEffect, useRef } from "react";
import { createTrianglesAnimation } from "@/lib/animation";

export default function TriangleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const cleanup = createTrianglesAnimation(canvasRef.current);
    
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
