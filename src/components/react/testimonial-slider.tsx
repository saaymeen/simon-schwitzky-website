import { useRef, type ReactNode, useCallback, useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';
import { LuChevronRight } from 'react-icons/lu/index.js';

const testimonials = [
	{
		key: '1',
		text: '1 At WAC, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let’s make a fruitful journey!',
		position: 'Head of Marketing',
		client: 'Willy Wigger',
		logo: '/kraftverkehr-logo.png',
	},
	{
		key: '2',
		text: 'At WAC, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let’s make a fruitful journey!',
		position: 'Head of Marketing',
		client: 'Willy Wigger',
		logo: '/ase-logo.svg',
	},
	{
		key: '3',
		text: 'At WAC, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let’s make a fruitful journey!',
		position: 'Head of Marketing',
		client: 'Willy Wigger',
		logo: '/alexxanders-logo.svg',
	},
	{
		key: '4',
		text: 'At WAC, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let’s make a fruitful journey!',
		position: 'Head of Marketing',
		client: 'Willy Wigger',
		logo: '/sekuris-logo.png',
	},
	{
		key: '5',
		text: 'At WAC, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let’s make a fruitful journey!',
		position: 'Head of Marketing',
		client: 'Willy Wigger',
		logo: '/coreku-logo.png',
	},
	{
		key: '6',
		text: 'At WAC, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let’s make a fruitful journey!',
		position: 'Head of Marketing',
		client: 'Willy Wigger',
		logo: '/dtc-logo.png',
	},
	/*{
		key: '7',
		text: 'At WAC, we are all about creating a habitat that lets you grow stronger roots and larger branches. Together let’s make a fruitful journey!',
		position: 'Head of Marketing',
		client: 'Willy Wigger',
		logo: 'https://admin.wac.co/uploads/Group_167339_823388c040.svg',
	},*/
];

function TestimonialSlider(): ReactNode {
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

	return (
		<>
			<ul className="mb-7 grid grid-cols-2 gap-x-7 gap-y-5 sm:grid-cols-3">
				{testimonials.map(({ key, logo }, index) => (
					<li key={key} className="flex items-center justify-center">
						<button
							onClick={() => emblaAPI?.scrollTo(index)}
							className="flex items-center justify-center hover:cursor-pointer"
						>
							<img
								src={logo}
								className={clsx(
									'max-h-8 transition-transform',
									selectedIndex === index && 'scale-[1.3]',
								)}
							/>
						</button>
					</li>
				))}
			</ul>

			<div className="mt-12 px-4 sm:px-12">
				<div ref={emblaRef} className="mx-auto flex max-w-7xl flex-col overflow-hidden">
					<ul // className="flex mx-4 sm:mx-12"
						className="flex"
						//style={{ gridAutoColumns: '100%' }}
					>
						{testimonials.map((testimonial) => (
							<li
								key={testimonial.key}
								className={
									clsx(
										// 'px-4 sm:px-12 md:px-0 md:pl-12 flex flex-col basis-full md:basis-1/2 lg:basis-1/3 grow-0 shrink-0',
										'mr-4 flex shrink-0 grow-0 basis-full flex-col sm:mr-12 sm:basis-[calc(50%-24px)] lg:basis-[calc(33.333%-40px)]',

										// i % 2 === 0 && 'sm:pl-12 sm:pr-6',
										// (i + 1) % 2 === 0 && 'sm:pr-12 sm:pl-6',
									)
									// 'min-w-0 flex-grow-0 flex-shrink-0 basis-[calc(100%-24px)] md:basis-[calc(50%-24px)] xl:basis-[calc(33.33%-72px)] bg-neutral-900 rounded-sm p-5',
									// 'md:mr-12',
								}
							>
								<div className="flex flex-col rounded-sm bg-neutral-900 p-5">
									<div>„{testimonial.text}‟</div>
									<div className="mt-3 flex flex-col">
										<span className="mb-px block text-sm text-neutral-200">
											{testimonial.client}
										</span>
										<div className="flex flex-row items-center justify-between">
											<span className="block text-xs text-neutral-400">
												{testimonial.position}
											</span>
											<a className="flex cursor-pointer items-center space-x-1 text-xs text-blue-400 hover:underline">
												<span>Read the full story</span>
												<LuChevronRight />
											</a>
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
