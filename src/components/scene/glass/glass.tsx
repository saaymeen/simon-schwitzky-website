import { useFBO } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { nanoid } from 'nanoid';
import { useSpring, animated } from '@react-spring/three';

import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

function lerp(v0: number, v1: number, t: number) {
	return v0 * (1 - t) + v1 * t;
}

const Glass = () => {
	// This reference gives us direct access to our mesh
	const mesh = useRef<THREE.Mesh>(null);
	const backgroundGroup = useRef<THREE.Group>(null);

	// This is our main render target where we'll render and store the scene as a texture
	const mainRenderTarget = useFBO();
	const backRenderTarget = useFBO();

	const saturation = useRef(1.14).current;
	const chromaticAberration = useRef(0.5).current;
	const refraction = useRef(0.25).current;

	const light = useRef(new THREE.Vector3(-1.0, 1.0, 1.0)).current;
	const diffuseness = useRef(0.2).current;
	const shininess = useRef(15.0).current;
	const fresnelPower = useRef(8.0).current;

	const iorR = useRef(1.15).current;
	const iorY = useRef(1.16).current;
	const iorG = useRef(1.18).current;
	const iorC = useRef(1.22).current;
	const iorB = useRef(1.22).current;
	const iorP = useRef(1.22).current;

	const uniforms = useMemo(
		() => ({
			uTexture: {
				value: null,
			},
			uIorR: { value: 1.0 },
			uIorY: { value: 1.0 },
			uIorG: { value: 1.0 },
			uIorC: { value: 1.0 },
			uIorB: { value: 1.0 },
			uIorP: { value: 1.0 },
			uRefractPower: {
				value: 0.2,
			},
			uChromaticAberration: {
				value: 1.0,
			},
			uSaturation: { value: 0.0 },
			uShininess: { value: 40.0 },
			uDiffuseness: { value: 0.2 },
			uFresnelPower: { value: 8.0 },
			uLight: {
				value: new THREE.Vector3(-1.0, 1.0, 1.0),
			},
			winResolution: {
				value: new THREE.Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
					Math.min(window.devicePixelRatio, 2),
				), // if DPR is 3 the shader glitches 🤷‍♂️
			},
		}),
		[],
	);

	const target = useRef(new THREE.Vector3()).current;

	const mp = useRef({ x: 0, y: 0 });
	useEffect(() => {
		const updateMousePosition = (ev: MouseEvent) => {
			mp.current = { x: ev.clientX, y: ev.clientY };
		};

		window.addEventListener('mousemove', updateMousePosition);
		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	}, []);

	useFrame((state, delta) => {
		const { gl, scene, camera } = state;
		if (mesh.current === null) {
			return;
		}

		mesh.current.visible = false;

		(mesh.current.material as THREE.ShaderMaterial).uniforms.uDiffuseness.value = diffuseness;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uShininess.value = shininess;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uLight.value = new THREE.Vector3(
			light.x,
			light.y,
			light.z,
		);
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uFresnelPower.value = fresnelPower;

		(mesh.current.material as THREE.ShaderMaterial).uniforms.uIorR.value = iorR;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uIorY.value = iorY;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uIorG.value = iorG;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uIorC.value = iorC;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uIorB.value = iorB;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uIorP.value = iorP;

		(mesh.current.material as THREE.ShaderMaterial).uniforms.uSaturation.value = saturation;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uChromaticAberration.value = chromaticAberration;
		(mesh.current.material as THREE.ShaderMaterial).uniforms.uRefractPower.value = refraction;

		gl.setRenderTarget(backRenderTarget);
		gl.render(scene, camera);

		(mesh.current.material as THREE.ShaderMaterial).uniforms.uTexture.value = backRenderTarget.texture;
		(mesh.current.material as THREE.ShaderMaterial).side = THREE.BackSide;

		mesh.current.visible = true;

		gl.setRenderTarget(mainRenderTarget);
		gl.render(scene, camera);

		(mesh.current.material as THREE.ShaderMaterial).uniforms.uTexture.value = mainRenderTarget.texture;
		(mesh.current.material as THREE.ShaderMaterial).side = THREE.FrontSide;

		gl.setRenderTarget(null);

		let x = 0;
		let y = 0;

		// const boundingClientRect = window.current.getBoundingClientRect();
		// const halfX = boundingClientRect.x + viewport.left / 2;
		// const halfY = boundingClientRect.y + viewport.top / 2;
		const halfX = window.innerWidth / 2;
		const halfY = window.innerHeight / 2;

		if (mp.current.x < halfX) {
			x = mp.current.x / halfX - 1;
		} else {
			x = mp.current.x / halfX - 1;
		}

		x = mp.current.x / halfX - 1;
		y = 1 - mp.current.y / halfY;

		target.x = lerp(target.x, x, delta * 10);
		target.y = lerp(target.y, y, delta * 10);
		target.z = 1; //camera.position.z;

		mesh.current?.lookAt(target);

		//target.x += (mp.current.x - target.x) * 0.2;
		//target.y += (-mp.current.y - target.y) * 0.2;
		//target.z = camera.position.z; // assuming the camera is located at ( 0, 0, z );
		//
		//mesh.current?.lookAt(target);
	});

	/*const transition = useTransition([], {
		from: { scale: [0, 0, 0], rotation: [0, 0, 0] },
		enter: ({ r }) => ({ scale: [1, 1, 1], rotation: [r * 3, r * 3, r * 3] }),
		leave: { scale: [0.1, 0.1, 0.1], rotation: [0, 0, 0] },
		config: { mass: 5, tension: 1000, friction: 100 },
		trail: 100,
	});*/

	//const { scale } = useSpring({
	//	scale: 20,
	//	from: { scale: 0 },
	//	// config: { friction: 50 },
	//	loop: true,
	//});

	return (
		<group>
			<color attach="background" args={['black']} />
			<group ref={backgroundGroup} visible={false}>
				<mesh position={[-4, -3, -4]}>
					<icosahedronGeometry args={[2, 16]} />
					<meshBasicMaterial color="white" />
				</mesh>
				<mesh position={[4, -3, -4]}>
					<icosahedronGeometry args={[2, 16]} />
					<meshBasicMaterial color="white" />
				</mesh>
				<mesh position={[-5, 3, -4]}>
					<icosahedronGeometry args={[2, 16]} />
					<meshBasicMaterial color="white" />
				</mesh>
				<mesh position={[5, 3, -4]}>
					<icosahedronGeometry args={[2, 16]} />
					<meshBasicMaterial color="white" />
				</mesh>
			</group>
			<mesh ref={mesh}>
				{/*<torusGeometry args={[3, 1, 32, 100]} />*/}
				<sphereGeometry args={[3.5, 5, 2]} />
				<shaderMaterial
					key={nanoid()}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={uniforms}
				/>
			</mesh>
		</group>
	);
};

export const Root = () => {
	const { scale } = useSpring({
		to: { scale: 1 },
		from: { scale: 0 },
		config: { friction: 50 },
	});

	return (
		<animated.group scale={scale}>
			<ambientLight intensity={1.0} />
			<Glass />
		</animated.group>
	);
};
