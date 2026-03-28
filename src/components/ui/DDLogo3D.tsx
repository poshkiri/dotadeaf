"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function DDLogo3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xf5c518, 2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xf5c518, 1.5, 20);
    fillLight.position.set(0, 0, 4);
    scene.add(fillLight);

    function createDShape(offsetX: number): THREE.Mesh {
      const shape = new THREE.Shape();

      shape.moveTo(offsetX + 0, -1.2);
      shape.lineTo(offsetX + 0, 1.2);
      shape.lineTo(offsetX + 0.4, 1.2);
      shape.bezierCurveTo(
        offsetX + 1.4,
        1.2,
        offsetX + 1.4,
        -1.2,
        offsetX + 0.4,
        -1.2,
      );
      shape.lineTo(offsetX + 0, -1.2);

      const hole = new THREE.Path();
      hole.moveTo(offsetX + 0.25, -0.85);
      hole.lineTo(offsetX + 0.25, 0.85);
      hole.lineTo(offsetX + 0.45, 0.85);
      hole.bezierCurveTo(
        offsetX + 0.95,
        0.85,
        offsetX + 0.95,
        -0.85,
        offsetX + 0.45,
        -0.85,
      );
      hole.lineTo(offsetX + 0.25, -0.85);
      shape.holes.push(hole);

      const extrudeSettings = {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.06,
        bevelSegments: 8,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      const material = new THREE.MeshStandardMaterial({
        color: 0xf5c518,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0xf5c518,
        emissiveIntensity: 0.15,
      });

      const mesh = new THREE.Mesh(geometry, material);
      geometry.center();
      return mesh;
    }

    const group = new THREE.Group();

    const d1 = createDShape(-1.0);
    const d2 = createDShape(0.2);

    group.add(d1);
    group.add(d2);
    group.position.set(0, 0, 0);
    scene.add(group);

    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5c518,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      mouseX = ((e.clientX - rect.left) / w - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / h - 0.5) * 2;
    };
    mount.addEventListener("mousemove", handleMouseMove);

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.05;
      group.rotation.x += (mouseY * 0.3 - group.rotation.x) * 0.05;

      group.position.y = Math.sin(t * 0.8) * 0.12;

      particles.rotation.y = t * 0.05;
      particles.rotation.x = t * 0.03;

      const pulse = 0.1 + Math.sin(t * 2) * 0.08;
      (d1.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      (d2.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      d1.geometry.dispose();
      (d1.material as THREE.Material).dispose();
      d2.geometry.dispose();
      (d2.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", cursor: "grab" }}
    />
  );
}
