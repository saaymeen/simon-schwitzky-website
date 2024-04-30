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
			<span className="font-heading mb-1 block text-sm">
				<span>{label}</span>
				<span className={clsx(required === false && 'hidden', 'text-primary')}>*</span>
			</span>
			<textarea
				ref={ref}
				name={name}
				className="focus:ring-primary rounded-sm border border-gray-800 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-1"
				{...rest}
			/>
			<ErrorMessage error={error} />
		</label>
	);
});

TextArea.displayName = 'TextArea';

export { TextArea };
