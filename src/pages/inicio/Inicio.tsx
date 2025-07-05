import { useEffect, useRef } from "react";
import "./Inicio.css";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const Inicio = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const guiRef = useRef<unknown>(null);

  useEffect(() => {
    // 1. Configuración inicial
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // 2. Configurar cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 3. Configurar renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    // 4. Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // 5. Configurar GUI
    const gui = new GUI();
    guiRef.current = gui;

    // 6. Cargar fuente y crear texto
    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const textGeometry = new TextGeometry("TE AMO CASSIE", {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      textGeometry.center();

      const textMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        metalness: 0.5,
        roughness: 0.2,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(textMesh);

      // Configuración GUI para el texto
      const textFolder = gui.addFolder("Texto");
      textFolder.add(textMesh.rotation, "x", 0, Math.PI * 2);
      textFolder.add(textMesh.rotation, "y", 0, Math.PI * 2);
      textFolder.add(textMesh.rotation, "z", 0, Math.PI * 2);
      textFolder.add(textMesh.material, "metalness", 0, 1);
      textFolder.add(textMesh.material, "roughness", 0, 1);
      textFolder.open();

      // Añadir luces
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
    });

    // 7. Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 8. Manejar redimensionamiento
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 9. Limpieza
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      gui.destroy();
    };
  }, []);

  return (
    <div className="inicio-container">
      <div ref={mountRef} className="canvas-container" />
    </div>
  );
};

export default Inicio;
