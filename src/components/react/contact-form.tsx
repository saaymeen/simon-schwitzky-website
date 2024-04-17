import { useRef, type ReactNode, useState, type FormHTMLAttributes } from 'react';

import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';
import ky from 'ky';
import { TextInput } from './text-input';
import { TextArea } from './text-area';
import { Button } from './button';
import clsx from 'clsx';

const schema = z.object({
	name: z.string().min(2, 'Bitte geben Sie einen Namen an'),
	email: z.string().email('Bitte geben Sie eine gültige E-Mail Adresse an'),
	mobile: z.string().optional(),
	message: z.string().min(10, 'Bitte schreiben Sie eine Nachricht mit mindestens zehn Zeichen'),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

const delay = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ContactForm(props: FormHTMLAttributes<HTMLFormElement>): ReactNode {
	const { className, ...rest } = props;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormInput, unknown, FormOutput>({
		defaultValues: {
			name: '',
			email: '',
			mobile: '',
			message: '',
		},
		resolver: zodResolver(schema),
	});

	const form = useRef<HTMLFormElement>(null);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const handleFormSubmit: SubmitHandler<FormOutput> = async (values) => {
		setErrorMessage('');
		setSuccessMessage('');

		let token = '';
		if (typeof form.current !== 'undefined' && form.current !== null) {
			const formData = new FormData(form.current);
			token = formData.get('cf-turnstile-response')?.toString() || '';
			console.log(token);
		}

		try {
			await ky.post('https://submit-form.com/opdJn3gEd', {
				json: { ...values, 'cf-turnstile-response': token },
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			reset();
			setSuccessMessage('Nachricht gesendet.');
		} catch (error) {
			console.error(error);
			setErrorMessage('Nachricht konnte nicht gesendet werden.');
		}
	};

	return (
		<form
			ref={form}
			className={clsx('flex flex-col space-y-3 max-w-3xl', className)}
			onSubmit={handleSubmit(handleFormSubmit)}
			{...rest}
		>
			<TextInput error={errors.name} placeholder="Max Mustermann" {...register('name')} label="Name" required />
			<div className="flex md:space-x-4 space-y-3 md:space-y-0 flex-col md:flex-row">
				<TextInput
					error={errors.email}
					placeholder="max@musterfamilie.de"
					{...register('email')}
					type="email"
					label="E-Mail"
					className="flex-1"
					required
				/>
				<TextInput
					placeholder="0151 1234 5678"
					error={errors.mobile}
					{...register('mobile')}
					type="tel"
					className="flex-1"
					label="Telefon"
				/>
			</div>
			<TextArea
				placeholder="Hallo Axel, ..."
				error={errors.message}
				{...register('message')}
				label="Nachricht"
				rows={7}
				required
			/>

			<div className="flex flex-row justify-end md:justify-start">
				<Turnstile siteKey="0x4AAAAAAAXCfPpX1bgGQOfG" />
			</div>

			{successMessage.length > 0 && <p className="text-green-500 my-4 text-sm">{successMessage}</p>}
			{errorMessage.length > 0 && <p className="text-red-500 my-4 text-sm">{errorMessage}</p>}

			<Button loading={isSubmitting} type="submit" className="self-end md:self-start" size="lg">
				Nachricht senden
			</Button>
		</form>
	);
}

export { ContactForm };
