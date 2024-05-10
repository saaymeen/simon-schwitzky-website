import { useRef, type ReactNode, useCallback, useEffect, useState, useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';
import { getTranslation } from '../../utils/i18n';

interface TestimonialSliderProps {
	currentLocale: string | undefined;
}

const translations = {
	en: {
		readFullStory: 'Read the full story',
		kraftverkehrPosition: 'Project- & Marketingmanagement',
		kraftverkehr: 'Collaborating with Simon is a breeze. He is always available to us and incredibly creative.',
		asePosition: 'CEO',
		ase: 'Simon has modernized our digital presence. He has implemented our exact vision with his cool and professional style.',
		alexxandersPosition: 'Service-Management',
		alexxanders: 'Creativity, flexibility, and reliability. Simon has provided us with all of that.',
		sekurisPosition: 'Cyber Security Management',
		sekuris: 'We are thrilled with Simon. His work on our app has exceeded all expectations.',
		corekuPosition: 'CEO',
		coreku: 'Simon asstisted us with upgrading our hiring process. The collaboration was entertaining and insightful. We are impressed by his professionalism.',
		omnifineryPosition: 'CEO',
		omnifinery:
			'Simon manages our E-Commerce store and maintains all POS integrations. He rocks and makes my brand glow!',
	},
	de: {
		readFullStory: 'Ganze Story lesen',
		kraftverkehrPosition: 'Projekt- & Marketingmanagement',
		kraftverkehr:
			'Die Zusammenarbeit mit Simon ist kinderleicht. Er ist immer für uns erreichbar und unglaublich kreativ.',
		asePosition: 'Geschäftsführer',
		ase: 'Simon hat unserer digitale Präsenz modernisiert. Er hat unsere Visionen mit seiner coolen und professionellen Art 1:1 umgesetzt.',
		alexxandersPosition: 'Service-Manager',
		alexxanders: 'Kreativität, Flexibilität und Zuverlässigkeit. All Das hat uns Simon geboten.',
		sekurisPosition: 'Cyber Security Manager',
		sekuris: 'Wir sind begeistert von Simon. Seine Arbeit an unserer App hat jegliche Erwartungen übertroffen.',
		corekuPosition: 'Geschäftsführer',
		coreku: 'Simon hat uns bei der Digitaliserung unseres Bewerbungsprozesses maßgeblich unterstützt. Die Zusammenarbeit war unterhaltsam und aufschlussreich. Wir sind von seiner Professionalität geflasth.',
		omnifineryPosition: 'Geschäftsführer',
		omnifinery:
			'Simon verwaltet unseren E-Commerce Shop und kümmert sich um sämtliche POS Integrationen. Er ist unschlagbar und bringt mein Unternehmen zum Glänzen.',
	},
};

// TODO: rework this to be an astro component
function TestimonialSlider(props: TestimonialSliderProps): ReactNode {
	const { currentLocale } = props;

	const autoplayPlugin = useRef(Autoplay({ stopOnInteraction: true })).current;
	const [emblaRef, emblaAPI] = useEmblaCarousel({ loop: true, align: 'start' }, [autoplayPlugin]);

	const [selectedIndex, setSelectedIndex] = useState(0);

	const onSelect = useCallback(() => {
		if (!emblaAPI) return;
		setSelectedIndex(emblaAPI.selectedScrollSnap());
		autoplayPlugin.stop();
	}, [emblaAPI, setSelectedIndex]);

	useEffect(() => {
		if (!emblaAPI) return;
		onSelect();
		autoplayPlugin.play();
		emblaAPI.on('select', onSelect);
		emblaAPI.on('reInit', onSelect);
	}, [emblaAPI, onSelect]);

	const [_, testimonials] = useMemo(() => {
		const translation = getTranslation(currentLocale, translations);

		const testimonials = [
			{
				key: 'kraftverkehr',
				text: translation.kraftverkehr,
				position: translation.kraftverkehrPosition,
				client: 'Lisa-Marie Lange',
				logo: '/kraftverkehr-logo.png',
			},
			{
				key: 'ase',
				text: translation.ase,
				position: translation.asePosition,
				client: 'Dipl.-Ing. Sabine Hofmann',
				logo: '/ase-logo.svg',
			},
			{
				key: 'alexxanders',
				text: translation.alexxanders,
				position: translation.alexxandersPosition,
				client: 'Diego Angelo',
				logo: '/alexxanders-logo.svg',
			},
			{
				key: 'sekuris',
				text: translation.sekuris,
				position: translation.sekurisPosition,
				client: 'Jan Bamesberger',
				logo: '/sekuris-logo.png',
			},
			{
				key: 'coreku',
				text: translation.coreku,
				position: translation.corekuPosition,
				client: 'Holger Wandelt',
				logo: '/coreku-logo.png',
			},
			{
				key: 'omni',
				text: translation.omnifinery,
				position: translation.omnifineryPosition,
				client: 'Evgeny Avetisian',
				logo: '/omnifinery-logo.svg',
			},
		];

		return [translation, testimonials];
	}, [currentLocale]);

	return (
		<>
			<div className="mt-12 px-4 sm:px-12">
				<ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-7 gap-y-5 sm:grid-cols-3">
					{testimonials.map(({ key, logo }, index) => (
						<li key={key} className="flex items-center justify-center">
							<button
								onClick={() => emblaAPI?.scrollTo(index)}
								className="relative flex h-8 w-full items-center justify-center hover:cursor-pointer"
							>
								<img
									src={logo}
									className={clsx(
										'absolute h-full w-full object-contain transition-transform xs:max-w-max',
										selectedIndex === index && 'scale-[1.3]',
									)}
								/>
							</button>
						</li>
					))}
				</ul>

				<div ref={emblaRef} className="mx-auto mt-12 flex max-w-7xl flex-col overflow-hidden">
					<ul className="flex">
						{testimonials.map((testimonial) => (
							<li
								key={testimonial.key}
								className={
									'mr-4 flex shrink-0 grow-0 basis-full flex-col sm:mr-12 sm:basis-[calc(50%-24px)] lg:basis-[calc(33.333%-40px)]'
								}
							>
								<div className="flex flex-1 flex-col rounded-sm bg-neutral-900 p-5">
									<div className="flex-1">„{testimonial.text}"</div>
									<div className="mt-3 flex flex-col">
										<span className="mb-px block text-sm text-neutral-200">
											{testimonial.client}
										</span>
										<div className="flex flex-row items-center justify-between">
											<span className="block text-xs text-neutral-400">
												{testimonial.position}
											</span>
											{/*<a className="flex cursor-pointer items-center space-x-1 text-xs text-blue-400 hover:underline">
												<span>{translation.readFullStory}</span>
												<LuChevronRight />
							</a>*/}
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export { TestimonialSlider };
