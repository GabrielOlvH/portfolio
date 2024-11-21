"use client";
import React, { useRef, useEffect, useState } from 'react';

const SPACE_HEIGHT = 1000;
const SPACE_WIDTH = 2000;
const SPACE_DEPTH = 750;
const PARTICLE_COUNT = 15000;

interface Particle {
    x: number;
    y: number;
    z: number;
    velocityZ: number;
}

function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

const createParticles = (): Particle[] => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: random(-SPACE_WIDTH, SPACE_WIDTH),
            y: random(-SPACE_WIDTH, SPACE_HEIGHT),
            z: random(0, SPACE_DEPTH),
            velocityZ: 1,
        });
    }
    return particles;
};

export default function Stars() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>(createParticles());
    const [velocityFactor, setVelocityFactor] = useState(0.5);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const render = () => {
            if (!context) return;

            context.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update particle position with variable velocity
                particle.z += particle.velocityZ * velocityFactor;
                if (particle.z > SPACE_DEPTH) {
                    particle.z -= SPACE_DEPTH;
                }

                // Convert 3D to 2D perspective
                const scale = SPACE_DEPTH / (SPACE_DEPTH + particle.z);
                const x2D = particle.x * scale + canvas.width / 2;
                const y2D = particle.y * scale + canvas.height / 2;
                const size = scale * 2; // Adjust size based on depth

                // Draw particle
                context.beginPath();
                context.arc(x2D, y2D, size, 0, Math.PI * 2);
                context.fillStyle = 'white';
                context.fill();
            });

            requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [velocityFactor]); // Re-run useEffect when velocityFactor changes

    return (
        <div>
            <canvas ref={canvasRef} style={{ display: 'block', position: "fixed", left: "0", top: "0" }} />
        </div>
    );
}
