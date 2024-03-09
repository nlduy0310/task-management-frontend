import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthProvider.tsx';
import { DataProvider } from './contexts/DataProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<DataProvider>
		<AuthProvider>
			<App />
		</AuthProvider>
	</DataProvider>
);
