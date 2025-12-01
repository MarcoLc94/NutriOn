import { useEffect, useRef } from "react";
import Button from "../../components/CustomButton/CustomButton";
import Benefits from "../benefits/Benefits";
import How from "../how/How";
import Testimonials from "../testimonials/Testimonials";
import Tip from "../tip/Tip";
import Video from "../video/Video";
import "./Inicio.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

const Inicio = () => {
  const titleRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const sizes = {
      height: window.innerHeight,
      width: window.innerWidth,
    };

    const loader = new GLTFLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.01,
      50
    );
    const baseWidth = 1400;
    const baseZ = 2;
    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));

    const desiredZ = baseZ * (baseWidth / window.innerWidth);
    camera.position.z = clamp(desiredZ, 1.5, 4);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: titleRef.current,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);

    const fruitModels: THREE.Group[] = [];
    const fruits: THREE.Group[] = [];
    const modelFiles = [
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

    let model: THREE.Group | null = null;
    let animationId: number;
    const intervals: ReturnType<typeof setInterval>[] = [];

    modelFiles.forEach((file) => {
      loader.load(file, (gltf) => {
        const model = gltf.scene;
        fruitModels.push(model);

        if (fruitModels.length === modelFiles.length) {
          for (let i = 0; i < 100; i++) {
            const randomModel =
              fruitModels[Math.floor(Math.random() * fruitModels.length)];
            const fruit = randomModel.clone();
            fruit.position.x = (Math.random() - 0.5) * 4;
            fruit.position.y = Math.random() * 5 + 2;
            fruit.position.z = (Math.random() - 0.5) * 4;
            fruit.rotation.x = Math.random() * Math.PI * 2;
            fruit.rotation.y = Math.random() * Math.PI * 2;
            fruit.rotation.z = Math.random() * Math.PI * 2;
            const scale = Math.random() * 0.2 + 0.1;
            fruit.scale.set(scale, scale, scale);
            scene.add(fruit);
            fruits.push(fruit);
          }
        }
      });
    });

    loader.load("/nutrion3dlogo.glb", (gltf) => {
      model = gltf.scene;
      model.rotation.x = 0;
      model.rotation.y = 4.7;
      model.rotation.z = 0;
      model.position.z = 1;

      const letters: THREE.Mesh[] = [];
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          letters.push(mesh);
          const material = mesh.material as
            | THREE.MeshStandardMaterial
            | THREE.Material[];
          if (Array.isArray(material)) {
            material.forEach((mat) =>
              (mat as THREE.MeshStandardMaterial).color.set(0x00ff00)
            );
          } else {
            material.color.set(0x00ff00);
            material.metalness = 0.6;
            material.roughness = 0;
          }
        }
      });

      scene.add(model);

      letters.forEach((letter, i) => {
        gsap.fromTo(
          letter.position,
          { y: 0 },
          { y: 0.5, yoyo: true, repeat: 1, delay: i * 0.1, duration: 0.5 }
        );
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
      intervals.push(interval);
    });

    const spinInterval = setInterval(() => {
      if (model) {
        gsap.to(model.rotation, {
          y: model.rotation.y + Math.PI * 2,
          duration: 2,
        });
      }
    }, 5000);
    intervals.push(spinInterval);

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
    };

    const updateCamera = () => {
      const desiredZ = baseZ * (baseWidth / window.innerWidth);
      camera.position.z = clamp(desiredZ, 1.5, 4);
      camera.updateProjectionMatrix();
    };
    updateCamera(); // inicial
    window.addEventListener("resize", () => {
      handleResize();
      updateCamera();
    });

    const animate = () => {
      renderer.render(scene, camera);
      fruits.forEach((f) => {
        f.position.y -= 0.01;
        f.rotation.x += Math.random() * 0.01;
        f.rotation.y += Math.random() * 0.01;
        f.rotation.z += Math.random() * 0.01;
        if (f.position.y < -2) {
          f.position.y = Math.random() * 5 + 3;
          f.position.x = (Math.random() - 0.5) * 4;
          f.position.z = (Math.random() - 0.5) * 4;
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      intervals.forEach(clearInterval);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="main-container" id="home">
      <div className="inicio-container">
        <div className="title-div">
          <canvas ref={titleRef}></canvas>
        </div>
        <div className="button-div">
          <a href="https://wa.me/528124493708" target="_blank">
            <Button className="button--success button--shadow-small button--rounded-large">
              Quiero mi plan
            </Button>
          </a>
        </div>
      </div>
      <Tip></Tip>

      <Benefits></Benefits>

      <How></How>

      <Video></Video>

      <Testimonials></Testimonials>
    </div>
  );
};

export default Inicio;
