import { type ReactNode, forwardRef, type ComponentProps } from 'react';
import clsx from 'clsx';
import { ErrorMessage } from './error-message';
import type { FieldError } from 'react-hook-form';

interface TextAreaProps extends ComponentProps<'textarea'> {
	label: string;
	error?: FieldError;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props: TextAreaProps, ref): ReactNode => {
	const { label, name, required, error, ...rest } = props;
	return (
		<label htmlFor={name} className="flex flex-col">
			<span className="block mb-1 text-sm font-heading">
				<span>{label}</span>
				<span className={clsx(required === false && 'hidden', 'text-primary')}>*</span>
			</span>
			<textarea
				ref={ref}
				name={name}
				className="bg-neutral-800 rounded-sm px-3 py-2 text-sm text-neutral-200 border-none focus:ring-1 focus:ring-primary placeholder:text-neutral-400"
				{...rest}
			/>
			<ErrorMessage error={error} />
		</label>
	);
});

TextArea.displayName = 'TextArea';

export { TextArea };
