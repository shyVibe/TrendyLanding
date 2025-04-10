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
      
      // Draw triangle with rounded corners
      ctx.save();
      ctx.translate(triangle.x, triangle.y);
      ctx.rotate(triangle.rotation);
      ctx.globalAlpha = triangle.opacity;
      
      // Define the three points of the triangle
      const topPoint = { x: 0, y: -triangle.size / 2 };
      const leftPoint = { x: -triangle.size / 2, y: triangle.size / 2 };
      const rightPoint = { x: triangle.size / 2, y: triangle.size / 2 };
      
      // Radius for rounded corners (adjust as needed)
      const radius = triangle.size / 8;
      
      ctx.beginPath();
      
      // Helper function to draw a rounded corner
      const drawRoundedCorner = (p1: {x: number, y: number}, p2: {x: number, y: number}, p3: {x: number, y: number}) => {
        // Find direction vectors
        const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
        const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
        
        // Normalize vectors
        const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        
        const uv1 = { x: v1.x / len1, y: v1.y / len1 };
        const uv2 = { x: v2.x / len2, y: v2.y / len2 };
        
        // Calculate rounded corner points
        const cornerPoint = p2;
        const startPoint = { 
          x: cornerPoint.x + uv1.x * radius, 
          y: cornerPoint.y + uv1.y * radius 
        };
        const endPoint = { 
          x: cornerPoint.x + uv2.x * radius, 
          y: cornerPoint.y + uv2.y * radius 
        };
        
        // Draw lines and arc
        ctx.lineTo(startPoint.x, startPoint.y);
        
        // Calculate control points for arc
        const angle1 = Math.atan2(uv1.y, uv1.x);
        const angle2 = Math.atan2(uv2.y, uv2.x);
        
        ctx.arc(
          cornerPoint.x, 
          cornerPoint.y, 
          radius, 
          angle1, 
          angle2, 
          false
        );
        
        return endPoint;
      };
      
      // Start at the right point (to avoid issues with the first rounded corner)
      ctx.moveTo(rightPoint.x, rightPoint.y);
      
      // Draw rounded corners
      drawRoundedCorner(leftPoint, rightPoint, topPoint);
      drawRoundedCorner(rightPoint, topPoint, leftPoint);
      drawRoundedCorner(topPoint, leftPoint, rightPoint);
      
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
