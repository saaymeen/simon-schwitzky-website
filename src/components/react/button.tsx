import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { type IconType } from 'react-icons/lib';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: IconType;
	size?: 'base' | 'lg';
	theme?: 'primary' | 'secondary';
	loading?: boolean;
}

function Button(props: ButtonProps): ReactNode {
	const {
		icon: Icon,
		loading = false,
		disabled = false,
		size = 'base',
		children,
		theme = 'secondary',
		className,
		...rest
	} = props;

	// const disabledButton = loading || disabled;

	return (
		<button
			className={clsx(
				'group flex cursor-pointer items-center rounded-sm transition-colors',
				size === 'base' && 'py-2 pl-3 text-xs',
				size === 'lg' && 'py-3 pl-5 text-base',
				size === 'lg' && (typeof Icon === 'undefined' ? 'pr-5' : 'pr-3'),
				size === 'base' && (typeof Icon === 'undefined' ? 'pr-3' : 'pr-1'),
				theme === 'secondary' && 'bg-neutral-800 text-white hover:bg-neutral-700',
				theme === 'primary' && 'border-blue-500 bg-blue-600 text-white hover:border-blue-400 hover:bg-blue-500',

				className,
			)}
			disabled={disabled}
			{...rest}
		>
			<AnimatePresence>
				{loading && (
					<motion.div
						role="status"
						className="overflow-hidden"
						initial={{ opacity: 0, width: 0 }}
						animate={{ opacity: 1, width: 'auto' }}
						exit={{ opacity: 0, width: 0 }}
					>
						<svg
							aria-hidden="true"
							className="mr-2 h-3 w-3 animate-spin fill-white text-neutral-800"
							viewBox="0 0 100 100"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
						<span className="sr-only">Loading...</span>
					</motion.div>
				)}
			</AnimatePresence>
			<span className="block">{children}</span>
			{Icon && (
				<Icon
					size={clsx(size === 'base' && 12, size === 'lg' && 16)}
					className={clsx(
						'block transition-all',
						size === 'base' && 'ml-1 mr-1 group-hover:ml-2 group-hover:mr-0',
						size === 'lg' && 'ml-2 mr-2 group-hover:ml-3 group-hover:mr-1',
					)}
				/>
			)}
		</button>
	);
}

export { Button };
