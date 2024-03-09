import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Link, useNavigate } from 'react-router-dom';

import axiosClient from '@/api/axios';
import { isAxiosError } from 'axios';
import { useState } from 'react';

const REGISTER_PATH = '/signup';
const zodPasswordRefine = (pw: string): boolean => {
	const regex = /^[a-zA-Z0-9]*$/;
	return regex.test(pw);
};

const formSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'This field has to be filled' })
			.email('This is not a valid email'),
		password: z
			.string()
			.min(1, { message: 'This field has to be filled' })
			.max(32, 'Maximum 32 characters allowed')
			.refine(
				zodPasswordRefine,
				'Password can only contain alphabetical characters and numbers'
			),
		repassword: z.string().min(1, { message: 'This field has to be filled' }),
	})
	.superRefine(({ password, repassword }, ctx) => {
		if (password !== repassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords does not match',
				path: ['repassword'],
			});
		}
	});

export default function SignUp() {
	const [signupError, setSignupError] = useState('');

	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			repassword: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await axiosClient.post(
				REGISTER_PATH,
				JSON.stringify({ email: values.email, password: values.password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			navigate('/signin');
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data?.error) {
					setSignupError(error.response.data.error);
				} else if (error.response) {
					setSignupError(`${error.response.status} - ${error.response.statusText}`);
				} else {
					setSignupError('No response from server');
				}
			} else {
				setSignupError('Some unknown error happened');
			}
		}
	}

	return (
		<div className="grid place-items-center w-full h-full bg-gradient-to-r from-teal-200 to-teal-500 font-sans">
			<div className="bg-white p-12 rounded-lg w-3/12">
				<div className="font-bold text-2xl mb-6 text-center">Sign Up</div>
				<hr className="mb-4" />
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="repassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<br />
							{signupError && (
								<span className="text-red-500 text-sm font-semibold">
									‼&nbsp;{signupError}
								</span>
							)}
							<Button className="w-full" type="submit">
								Submit
							</Button>
						</form>
					</Form>
				</div>
				<div className="mt-4 text-sm">
					<span>Already had an account?&nbsp;</span>
					<Link className="font-bold hover:underline" to="/signin">
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
}
