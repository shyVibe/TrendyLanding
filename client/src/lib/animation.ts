interface Circle {
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

export function createCirclesAnimation(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  
  const circles: Circle[] = [];
  let animationFrameId: number;
  let isActive = true;
  
  // Set canvas dimensions
  const setCanvasDimensions = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recreate circles when dimensions change
    circles.length = 0;
    createCircles();
  };
  
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  function getRandomColor(): string {
    const colors = ['#1E293B', '#334155', '#475569'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function createCircles() {
    const circleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 20000));
    
    for (let i = 0; i < circleCount; i++) {
      circles.push({
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
  
  createCircles();
  
  // Animation loop
  function animate() {
    if (!isActive || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    circles.forEach(circle => {
      // Update position
      circle.x += circle.velocity.x;
      circle.y += circle.velocity.y;
      circle.rotation += circle.rotationSpeed;
      
      // Bounce off edges
      if (circle.x < 0 || circle.x > canvas.width) circle.velocity.x *= -1;
      if (circle.y < 0 || circle.y > canvas.height) circle.velocity.y *= -1;
      
      // Draw circle
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(circle.rotation);
      ctx.globalAlpha = circle.opacity;
      
      // Draw a perfect circle
      ctx.beginPath();
      ctx.arc(0, 0, circle.size / 2, 0, Math.PI * 2);
      ctx.closePath();
      
      ctx.fillStyle = circle.color;
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
