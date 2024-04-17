import { useState, type ReactNode, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Particles } from '../scene/gpgpu-curl-noise/particles';
import { Root as FBOParticles } from '../scene/thing/thing';
import { Root as Glass } from '../scene/glass/glass';
import { OrbitControls } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

function MastheadAnimations(): ReactNode {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleChangeAnimationPress = () => setSelectedIndex((index) => (index === 0 ? 1 : 0));

	return (
		<>
			<div className="flex flex-1 mt-auto items-end justify-end text-white z-[2]">
				<button
					onClick={handleChangeAnimationPress}
					className="flex flex-row items-stretch rounded-sm overflow-hidden bg-black/30"
				>
					<ul className="w-16 h-16 bg-neutral-500 rounded-sm">
						<li />
						<li />
					</ul>
					<div className="flex flex-col ml-3 pr-3 py-1 items-start">
						<span className="block text-neutral-200 text-xs">Next</span>
						<span className="block text-white">{selectedIndex === 0 ? 'Prism' : 'Particles'}</span>
						<ul className="mt-auto flex space-x-3 w-32">
							<li
								className={clsx(
									'flex-1 h-[2px] rounded-full transition-colors',
									selectedIndex === 0 ? 'bg-white' : 'bg-neutral-400',
								)}
							/>
							<li
								className={clsx(
									'flex-1 h-[2px] rounded-full transition-colors',
									selectedIndex === 1 ? 'bg-white' : 'bg-neutral-400',
								)}
							/>
						</ul>
					</div>
				</button>
			</div>

			<div className="absolute inset-0 flex justify-center items-center z-[1]">
				<Canvas camera={{ position: [4, -2, 7] }} dpr={[1, 2]}>
					{selectedIndex === 0 && <FBOParticles />}
					{selectedIndex === 1 && <Glass />}
				</Canvas>
			</div>
		</>
	);
}

export { MastheadAnimations };
