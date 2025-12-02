import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TunnelEffectProps {
  isActive: boolean;
  onAnimationComplete?: () => void;
}

const TunnelEffect: React.FC<TunnelEffectProps> = ({ isActive, onAnimationComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const progressRef = useRef(0); // Camera progress along path
  
  useEffect(() => {
    if (!canvasRef.current) return;

    // --- SETUP ---
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    // Start with fog to hide the end of the tube
    scene.fog = new THREE.FogExp2(0x000000, 0.005);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);

    // --- CURVE & TUBE ---
    // Create a wild, curvy path
    const points: THREE.Vector3[] = [];
    const controlPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(20, 10, -50),
      new THREE.Vector3(40, -10, -100),
      new THREE.Vector3(60, 15, -150),
      new THREE.Vector3(50, -5, -200),
      new THREE.Vector3(0, 0, -250),
      new THREE.Vector3(-100, 0, -200),
      new THREE.Vector3(-150, 0, -100),
      new THREE.Vector3(-100, 0, 0), // Loop back roughly
      new THREE.Vector3(-50, 10, 100),
      new THREE.Vector3(-20, -10, 150),
      new THREE.Vector3(0, 0, 200)
    ];
    
    const curve = new THREE.CatmullRomCurve3(controlPoints);
    curve.tension = 0.5;

    // Tube Geometry
    const geometry = new THREE.TubeGeometry(curve, 400, 4, 12, false);
    
    // Create vertex colors for the tube wireframe
    const count = geometry.attributes.position.count;
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color(i % 2 === 0 ? "#00a3ff" : "#00ffaa");
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const tube = new THREE.Mesh(geometry, material);
    scene.add(tube);

    // --- PARTICLES (STARS) ---
    const starsCount = 1500;
    const starsPos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      starsPos[i*3] = (Math.random() - 0.5) * 800;
      starsPos[i*3+1] = (Math.random() - 0.5) * 800;
      starsPos[i*3+2] = (Math.random() - 0.5) * 800;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.6
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);


    // --- CODE SPRITES (The Matrix effect) ---
    // Helper to create text texture
    const createTextSprite = (text: string, color: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if(ctx) {
        ctx.font = 'bold 24px monospace';
        ctx.fillStyle = color;
        ctx.fillText(text, 0, 40);
      }
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.7 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(20, 5, 1);
      return sprite;
    }

    const snippets = ["<div>", "const x", "import", "return", "010101", "ERROR", "NULL"];
    for(let i=0; i<50; i++) {
      const txt = snippets[Math.floor(Math.random() * snippets.length)];
      const sprite = createTextSprite(txt, Math.random() > 0.5 ? '#00ffaa' : '#00a3ff');
      // Position randomly around the path
      const t = Math.random();
      const pos = curve.getPointAt(t);
      const normal = curve.getTangentAt(t); // approximate normal usage
      
      sprite.position.copy(pos).add(new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      ));
      scene.add(sprite);
    }

    // --- ANIMATION LOOP ---
    const speed = 0.0005;
    
    const animate = () => {
      // If active, move camera forward
      if (isActive) {
        progressRef.current += speed * 4; // Fast forward
      } else {
        progressRef.current += speed; // Idle drift
      }

      // Loop progress
      if (progressRef.current > 1) {
         if (isActive && onAnimationComplete) {
            // If we were zooming and hit the end, trigger completion
            onAnimationComplete();
            return; // Stop animation loop for now
         }
         progressRef.current = 0;
      }

      const p1 = curve.getPointAt(progressRef.current % 1);
      const p2 = curve.getPointAt((progressRef.current + 0.01) % 1);

      camera.position.copy(p1);
      camera.lookAt(p2);

      // Rotate tube slightly
      tube.rotation.z += 0.001;

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // --- RESIZE ---
    const handleResize = () => {
      if(!canvasRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      // Basic cleanup
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isActive, onAnimationComplete]);

  return (
    <div className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100 z-20' : 'opacity-40 z-0'}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default TunnelEffect;
