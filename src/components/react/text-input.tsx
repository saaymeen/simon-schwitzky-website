import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { ErrorMessage } from './error-message';
import type { FieldError } from 'react-hook-form';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: FieldError;

	// name?: string;
	// type?: astroHTML.JSX.HTMLInputTypeAttribute;
}
const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props: TextInputProps, ref): ReactNode => {
	const { label, name, type, error, className, required = false, ...rest } = props;

	return (
		<label className={clsx('flex flex-col', className)} htmlFor={name}>
			<span className="font-heading mb-1 block text-sm">
				<span>{label}</span>
				<span className={clsx(required === false && 'hidden', 'text-primary')}>*</span>
			</span>
			<input
				ref={ref}
				aria-required={required}
				type={type}
				name={name}
				className="focus:ring-primary rounded-sm border border-gray-800 bg-white px-3 py-2 text-sm focus:ring-1"
				{...rest}
			/>
			<ErrorMessage error={error} />
		</label>
	);
});

TextInput.displayName = 'TextInput';

export { TextInput };
