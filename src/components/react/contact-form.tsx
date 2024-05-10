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
import { getTranslation } from '../../utils/i18n';

const schema = z.object({
	name: z.string().min(2, 'Bitte geben Sie einen Namen an'),
	email: z.string().email('Bitte geben Sie eine gültige E-Mail Adresse an'),
	mobile: z.string().optional(),
	message: z.string().min(10, 'Bitte schreiben Sie eine Nachricht mit mindestens zehn Zeichen'),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

interface ContactFormProps extends FormHTMLAttributes<HTMLFormElement> {
	currentLocale?: string;
}

const translations = {
	en: {
		email: 'E-Mail',
		mobile: 'Phone',
		name: 'Name',
		namePlaceholder: 'John Doe',
		emailPlaceholder: 'jon@doe.com',
		mobilePlaceholder: '+1 (310) 123-456',
		message: 'Message',
		messagePlaceholder: 'Hi Simon, ...',
		sendMessage: 'Send message',
	},
	de: {
		email: 'E-Mail',
		mobile: 'Telefon',
		name: 'Name',
		namePlaceholder: 'Max Mustermann',
		emailPlaceholder: 'max@mustermann.de',
		mobilePlaceholder: '+49 151 44117777',
		message: 'Nachricht',
		messagePlaceholder: 'Hallo Simon, ...',
		sendMessage: 'Nachricht senden',
	},
};

function ContactForm(props: ContactFormProps): ReactNode {
	const { className, currentLocale, ...rest } = props;

	const translation = getTranslation(currentLocale, translations);

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
			className={clsx('flex max-w-3xl flex-col space-y-3 rounded-sm transition-[padding]', className)}
			onSubmit={handleSubmit(handleFormSubmit)}
			{...rest}
		>
			<TextInput error={errors.name} placeholder="Max Mustermann" {...register('name')} label="Name" required />
			<div className="flex flex-col space-y-3 md:flex-row md:space-x-4 md:space-y-0">
				<TextInput
					error={errors.email}
					placeholder={translation.emailPlaceholder}
					{...register('email')}
					type="email"
					label={translation.email}
					className="flex-1"
					required
				/>
				<TextInput
					placeholder={translation.mobilePlaceholder}
					error={errors.mobile}
					{...register('mobile')}
					type="tel"
					className="flex-1"
					label={translation.mobile}
				/>
			</div>
			<TextArea
				placeholder={translation.messagePlaceholder}
				error={errors.message}
				{...register('message')}
				label={translation.message}
				rows={7}
				required
			/>

			<div className="flex flex-row justify-end">
				<Turnstile siteKey="0x4AAAAAAAXCfPpX1bgGQOfG" />
			</div>

			{successMessage.length > 0 && <p className="my-4 text-sm text-green-500">{successMessage}</p>}
			{errorMessage.length > 0 && <p className="my-4 text-sm text-red-500">{errorMessage}</p>}

			<Button loading={isSubmitting} type="submit" className="self-end" size="lg" theme="primary">
				{translation.sendMessage}
			</Button>
		</form>
	);
}

export { ContactForm };
