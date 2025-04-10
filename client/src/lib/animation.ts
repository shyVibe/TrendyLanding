interface Triangle {
  size: number;
  x: number;
  y: number;
  opacity: number;
  velocity: {
    x: number;
    y: number;
  };
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export function createTrianglesAnimation(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  
  const triangles: Triangle[] = [];
  let animationFrameId: number;
  let isActive = true;
  
  // Set canvas dimensions
  const setCanvasDimensions = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recreate triangles when dimensions change
    triangles.length = 0;
    createTriangles();
  };
  
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  function getRandomColor(): string {
    const colors = ['#1E293B', '#334155', '#475569'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function createTriangles() {
    const triangleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 20000));
    
    for (let i = 0; i < triangleCount; i++) {
      triangles.push({
        size: Math.random() * 60 + 20,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.25 + 0.1,
        velocity: {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3
        },
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        color: getRandomColor()
      });
    }
  }
  
  createTriangles();
  
  // Animation loop
  function animate() {
    if (!isActive || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    triangles.forEach(triangle => {
      // Update position
      triangle.x += triangle.velocity.x;
      triangle.y += triangle.velocity.y;
      triangle.rotation += triangle.rotationSpeed;
      
      // Bounce off edges
      if (triangle.x < 0 || triangle.x > canvas.width) triangle.velocity.x *= -1;
      if (triangle.y < 0 || triangle.y > canvas.height) triangle.velocity.y *= -1;
      
      // Draw triangle
      ctx.save();
      ctx.translate(triangle.x, triangle.y);
      ctx.rotate(triangle.rotation);
      ctx.globalAlpha = triangle.opacity;
      
      ctx.beginPath();
      ctx.moveTo(0, -triangle.size / 2);
      ctx.lineTo(-triangle.size / 2, triangle.size / 2);
      ctx.lineTo(triangle.size / 2, triangle.size / 2);
      ctx.closePath();
      
      ctx.fillStyle = triangle.color;
      ctx.fill();
      
      ctx.restore();
    });
    
    animationFrameId = requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Cleanup function
  return () => {
    isActive = false;
    window.removeEventListener('resize', setCanvasDimensions);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}
