import { type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Root as FBOParticles } from '../scene/thing/thing';

function MastheadAnimations(): ReactNode {
	return (
		<div className="absolute inset-0 z-[1] flex items-center justify-center">
			<Canvas camera={{ position: [4, -2, 7] }} dpr={[1, 2]}>
				<FBOParticles />
			</Canvas>
		</div>
	);
}

/*
function MastheadAnimations(props: MastheadAnimationsProps): ReactNode {
	// const { currentLocale } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleChangeAnimationPress = () => setSelectedIndex((index) => (index === 0 ? 1 : 0));

	const translation = getTranslation(currentLocale, translations);

	return (
		<>
			<div className="z-[2] mt-auto flex flex-1 items-end justify-end text-white">
				<button
					onClick={handleChangeAnimationPress}
					className="flex flex-row items-stretch overflow-hidden rounded-sm bg-black/30"
				>
					<ul className="h-16 w-16 rounded-sm bg-neutral-500">
						<li />
						<li />
					</ul>
					<div className="ml-3 flex flex-col items-start py-1 pr-3">
						<span className="block text-xs text-neutral-200">{translation.next}</span>
						<span className="block text-white">
							{selectedIndex === 0 ? translation.prism : translation.space}
						</span>
						<ul className="mt-auto flex w-32 space-x-3">
							<li
								className={clsx(
									'h-[2px] flex-1 rounded-full transition-colors',
									selectedIndex === 0 ? 'bg-white' : 'bg-neutral-400',
								)}
							/>
							<li
								className={clsx(
									'h-[2px] flex-1 rounded-full transition-colors',
									selectedIndex === 1 ? 'bg-white' : 'bg-neutral-400',
								)}
							/>
						</ul>
					</div>
				</button>
			</div>

			<div className="absolute inset-0 z-[1] flex items-center justify-center">
				<Canvas camera={{ position: [4, -2, 7] }} dpr={[1, 2]}>
					{selectedIndex === 0 && <FBOParticles />}
					{selectedIndex === 1 && <Glass />}
				</Canvas>
			</div>
		</>
	);
}*/

export { MastheadAnimations };
