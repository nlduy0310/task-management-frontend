import { useContext } from 'react';
import DataContext from '@/contexts/DataProvider';

const useData = () => {
	return useContext(DataContext);
};

export default useData;
