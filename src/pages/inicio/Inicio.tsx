import { useRef, useMemo, useEffect } from "react";
import Button from "../../components/CustomButton/CustomButton";
import Benefits from "../benefits/Benefits";
import How from "../how/How";
import Testimonials from "../testimonials/Testimonials";
import Tip from "../tip/Tip";
import Video from "../video/Video";
import "./Inicio.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import gsap from "gsap";

const FRUIT_URLS = [
  "/tomato3dmodel.glb",
  "/banana3dmodel.glb",
  "/lemon3dmodel.glb",
  "/purplegrapes3dmodel.glb",
  "/yellowpear3dmodel.glb",
  "/brocolli3dmodel.glb",
  "/strawberry3dmodel.glb",
  "/watermelon3dmodel.glb",
  "/pineapple3dmodel.glb",
  "/radish3dmodel.glb",
];

function FloatingFruit({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { viewport } = useThree();
  
  // Re-calculate random positions if viewport changes? 
  // For simplicity, we initialize based on a wide range and let useFrame handle the logic if needed, 
  // or just use viewport in the useMemo if we want them to respawn correctly on resize (though useMemo runs once).
  // Better: Store initial random values (0-1) and map to viewport in render/useFrame.
  
  const initialData = useMemo(() => ({
    // Random x/y/z factors (0-1 or similar) to be scaled by viewport
    xFactor: (Math.random() - 0.5), 
    yOffset: Math.random() * 5 + 2,
    zFactor: (Math.random() - 0.5) * 2, // Closer to camera? User said "nearer"
    rotation: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    ] as [number, number, number],
    // Increased scale for "nearer" feel
    scale: Math.random() * 0.3 + 0.2, 
    rotSpeed: [
      Math.random() * 0.01,
      Math.random() * 0.01,
      Math.random() * 0.01,
    ] as [number, number, number],
  }), []);

  const ref = useRef<THREE.Group>(null);
  const speed = useRef(Math.random() * 0.02 + 0.01);

  useFrame(() => {
    if (!ref.current) return;
    
    // Fall down
    ref.current.position.y -= speed.current;
    
    // Rotate
    ref.current.rotation.x += initialData.rotSpeed[0];
    ref.current.rotation.y += initialData.rotSpeed[1];
    ref.current.rotation.z += initialData.rotSpeed[2];

    // Reset if below view
    // viewport.height / 2 is roughly the top/bottom boundary in Three units
    if (ref.current.position.y < -viewport.height / 2 - 2) {
      ref.current.position.y = viewport.height / 2 + 2 + Math.random() * 2;
      // Respawn at random X within FULL width
      ref.current.position.x = (Math.random() - 0.5) * viewport.width;
      // Keep Z somewhat close
      ref.current.position.z = (Math.random() - 0.5) * 2;
    }
  });

  // Initial position setup using current viewport
  useEffect(() => {
      if(ref.current) {
          ref.current.position.x = initialData.xFactor * viewport.width;
          ref.current.position.y = initialData.yOffset;
          // User wants them "nearer", so z closer to 0 or positive. Camera is at z=3.
          // Let's keep them somewhat random z but not too far back.
          ref.current.position.z = initialData.zFactor; 
      }
  }, [viewport.width, initialData]);

  return (
    <Clone
      ref={ref}
      object={scene}
      scale={[initialData.scale, initialData.scale, initialData.scale]}
      rotation={initialData.rotation}
    />
  );
}

function Fruits() {
  const fruits = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      key: i,
      url: FRUIT_URLS[Math.floor(Math.random() * FRUIT_URLS.length)],
    }));
  }, []);

  return (
    <group>
      {fruits.map((f) => (
        <FloatingFruit key={f.key} url={f.url} />
      ))}
    </group>
  );
}

function Logo() {
  const { scene } = useGLTF("/nutrion3dlogo.glb");
  const ref = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();

  // Determine scale
  // User feedback: Desktop ~40vw (factor 0.25 was used). Mobile needs ~80vw.
  // We use pixel width to detect mobile.
  const scale = useMemo(() => {
    const isMobile = size.width < 768; // standard mobile breakpoint
    const factor = isMobile ? 0.55 : 0.25; 
    return viewport.width * factor;
  }, [viewport.width, size.width]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
                if(mat instanceof THREE.MeshStandardMaterial) mat.color.set(0x00ff00);
            });
        } else {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.color.set(0x00ff00);
            mat.metalness = 0.6;
            mat.roughness = 0;
        }
      }
    });

    const letters: THREE.Mesh[] = [];
    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) letters.push(child as THREE.Mesh);
    });

    letters.forEach((letter, i) => {
        gsap.fromTo(
            letter.position,
            { y: 0 },
            { y: 0.5, yoyo: true, repeat: 1, delay: i * 0.1, duration: 0.5 }
        );
    });
  }, [scene]);

  useEffect(() => {
    const letters: THREE.Mesh[] = [];
    scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) letters.push(child as THREE.Mesh);
    });

    const interval = setInterval(() => {
        letters.forEach((letter, i) => {
          gsap.to(letter.rotation, {
            y: letter.rotation.y + Math.PI * 2,
            delay: i * 0.1,
            duration: 1.5,
          });
        });
      }, 5000);

    const spinInterval = setInterval(() => {
        if (ref.current) {
            gsap.to(ref.current.rotation, {
                y: ref.current.rotation.y + Math.PI * 2,
                duration: 2,
            });
        }
    }, 20000);

    return () => {
        clearInterval(interval);
        clearInterval(spinInterval);
    }
  }, [scene]);

  return (
    <primitive 
        object={scene} 
        ref={ref} 
        // Auto-scale based on viewport
        scale={[scale, scale, scale]}
        rotation={[0, 4.7, 0]} 
        position={[0, 0, 0]} // Center
    />
  );
}

// Preload models
FRUIT_URLS.forEach(url => useGLTF.preload(url));
useGLTF.preload("/nutrion3dlogo.glb");

const Inicio = () => {
  return (
    <div className="main-container" id="home">
      <div className="inicio-container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }} // Adjusted camera to see more width cleanly if needed
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Fruits />
            <Logo />
          </Canvas>
        </div>
        
        <div className="title-div" style={{ position: 'relative', zIndex: 1, height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        </div>
        <div className="button-div" style={{ position: 'relative', zIndex: 1 }}>
          <a href="https://wa.me/528124493708" target="_blank">
            <Button className="button--success button--shadow-small button--rounded-large">
              Quiero mi plan
            </Button>
          </a>
        </div>
      </div>
      <Tip />
      <Benefits />
      <How />
      <Video />
      <Testimonials />
    </div>
  );
};

export default Inicio;
