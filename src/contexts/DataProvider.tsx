import { AppDataManager } from '@/core/AppDataManager';
import { createContext, ReactNode, useState } from 'react';

const DataContext = createContext({});

export type DataContextType = {
	dataManager: AppDataManager;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
	const [dataManager] = useState<AppDataManager>(new AppDataManager());

	return <DataContext.Provider value={{ dataManager }}>{children}</DataContext.Provider>;
};

export default DataContext;
