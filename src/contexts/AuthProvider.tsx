import { createContext, useState } from 'react';
import { ReactNode } from 'react';

const AuthContext = createContext({});

export type AuthContextObjectType = {
	email: string;
	password: string;
	accessToken: string;
};

export type AuthContextType = {
	auth: AuthContextObjectType;
	setAuth: (obj: AuthContextObjectType) => void;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState({ email: '', password: '', accessToken: '' });

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
