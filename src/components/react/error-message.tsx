import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { type HTMLAttributes, type ReactNode } from 'react';
import { type FieldError } from 'react-hook-form';

interface ErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {
	error?: FieldError;
}

function ErrorMessage(props: ErrorMessageProps): ReactNode {
	const { error, className, ...rest } = props;

	return (
		<AnimatePresence>
			{error && (
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: 'auto' }}
					exit={{ height: 0 }}
					className="overflow-hidden flex flex-col"
				>
					<span className={clsx('mt-1 text-sm text-red-400', className)} {...rest}>
						{error.message}
					</span>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export { ErrorMessage, type ErrorMessageProps };
