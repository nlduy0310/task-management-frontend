import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '@/api/axios';
import useData from '@/hooks/useData';
import { DataContextType } from '@/contexts/DataProvider';

const enum AuthStatus {
	PENDING,
	SUCCESS,
	FAIL,
}

const RequireAuth = () => {
	console.log('RequireAuth called');
	const { dataManager } = useData() as DataContextType;
	const location = useLocation();

	const [authStatus, setAuthStatus] = useState(AuthStatus.PENDING);

	const getAuthStatus = async () => {
		console.log('getAuthStatus called');
		const success = await dataManager.renewAccessToken();
		if (success) {
			await dataManager.fetchCurrentUser();
			setAuthStatus(AuthStatus.SUCCESS);
		} else {
			setAuthStatus(AuthStatus.FAIL);
		}
		// try {
		// 	console.log('getAuthStatus started');
		// 	if (!dataManager?.accessToken) {
		// 		// console.log('No access token found in application');
		// 		throw new Error('Can not find app access token');
		// 		// return setAuthStatus(AuthStatus.FAIL);
		// 	}
		// 	// console.log('verifying auth');
		// 	await axiosClient.get('/protected', {
		// 		headers: {
		// 			Authorization: `Bearer ${dataManager.accessToken}`,
		// 		},
		// 		withCredentials: true,
		// 	});
		// 	// if this return success
		// 	// console.log('auth verified successfully');
		// 	setAuthStatus(AuthStatus.SUCCESS);
		// 	console.log(`getAuthStatus ended ${authStatus}`);
		// } catch (error) {
		// 	// try using refreshToken
		// 	// console.log('trying refresh token');
		// 	const success = await dataManager.renewAccessToken();
		// 	// console.log('access token status', success);

		// 	if (success) {
		// 		setAuthStatus(AuthStatus.SUCCESS);
		// 	} else {
		// 		setAuthStatus(AuthStatus.FAIL);
		// 	}
		// 	console.log(`getAuthStatus ended ${authStatus}`);
		// }
	};

	useEffect(() => {
		console.log('useEffect called');
		getAuthStatus();
	});

	return authStatus === AuthStatus.SUCCESS ? (
		<Outlet />
	) : authStatus === AuthStatus.FAIL ? (
		<Navigate to="/signin" state={{ from: location }} replace />
	) : (
		<div>Verifying ...</div>
	);
};

export default RequireAuth;
