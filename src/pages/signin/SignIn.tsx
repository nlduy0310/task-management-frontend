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

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useData from '@/hooks/useData';

import axiosClient from '@/api/axios';
import { isAxiosError } from 'axios';
import { DataContextType } from '@/contexts/DataProvider';
const LOGIN_URL = '/auth';

const zodPasswordRefine = (pw: string): boolean => {
	const regex = /^[a-zA-Z0-9]*$/;
	return regex.test(pw);
};

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'This field has to be filled' })
		.email('This is not a valid email'),
	password: z
		.string()
		.min(1, { message: 'This field has to be filled' })
		.max(32, 'Maximum 32 characters allowed')
		.refine(zodPasswordRefine, 'Password can only contain alphabetical characters and numbers'),
});

export default function SignIn() {
	const [signinError, setSigninError] = useState('');

	const { dataManager } = useData() as DataContextType;

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await axiosClient.post(
				LOGIN_URL,
				JSON.stringify({ email: values.email, password: values.password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);

			//console.log(response.data);
			const accessToken = response.data?.accessToken;
			dataManager.accessToken = accessToken;
			await dataManager.fetchCurrentUser();
			setSigninError('');
			navigate(from, { replace: true });
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.data?.error) {
					setSigninError(`${error.response.data.error}`);
				} else if (error.response) {
					setSigninError(`${error.response.status} - ${error.response.statusText}`);
				} else {
					setSigninError('No response error');
				}
			} else {
				setSigninError('Some error happened');
			}
		}
	}

	return (
		<div className="grid place-items-center w-full h-full bg-gradient-to-r to-teal-200 from-teal-500 font-sans">
			<div className="bg-white p-12 rounded-lg w-3/12">
				<div className="font-bold text-2xl mb-6 text-center">Sign In</div>
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
							<br />
							{signinError && (
								<span className="text-red-500 text-sm font-semibold">
									‼&nbsp;{signinError}
								</span>
							)}
							<Button className="w-full" type="submit">
								Submit
							</Button>
						</form>
					</Form>
				</div>
				<div className="mt-4 text-sm">
					<span>Don't have an account?&nbsp;</span>
					<Link className="font-bold hover:underline" to="/signup">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}
