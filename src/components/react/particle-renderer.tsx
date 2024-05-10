/*
import { Canvas, dispose, useFrame, type RootState } from '@react-three/fiber';
import { useEffect, type ReactNode } from 'react';
import { Root as FBOParticles } from '../scene/thing/thing';

import useCapture from 'use-capture';
var capturer;
var dom;
var start;

function GetInfo() {
	useFrame((state) => {
		if (capturer && dom && false) {
			capturer.capture(dom);

			let elapsed = Date.now() - start;
			console.log('capturing frame, elapsed =', elapsed);
			if (elapsed > 40000) {
				capturer.stop();
				capturer.save();

				capturer = null;
				dom = null;
			}
		}
	});

	return <group dispose={null} />;
}

function ParticleRenderer(): ReactNode {
	const onCreated = (state: RootState) => {
		dom = state.gl.domElement;
		capturer = new CCapture({
			verbose: false,
			//display: true,
			framerate: 30,
			// quality: 100,
			format: 'png',
			// timeLimit: 4,
			// frameLimit: 0,
			// autoSaveTime: 0,
		});

		start = Date.now();
		//capturer.start();
	};

	return (
		<div className="absolute inset-0">
			<Canvas
				onCreated={onCreated}
				gl={{ preserveDrawingBuffer: true }}
				camera={{ position: [4, -2, 7] }}
				dpr={[1, 2]}
			>
				<GetInfo />
				<FBOParticles />
			</Canvas>
		</div>
	);
}

export { ParticleRenderer };
*/

export const ParticleRenderer = () => null;
