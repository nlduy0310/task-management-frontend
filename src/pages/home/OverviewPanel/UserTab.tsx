import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useData from '@/hooks/useData';
import { DataContextType } from '@/contexts/DataProvider';
import { useState } from 'react';

export default function UserTab() {
	console.log('User tab called');
	const { dataManager } = useData() as DataContextType;
	const [state] = useState({
		email: dataManager.currentUser?.email || 'User email',
		name: dataManager.currentUser?.displayName || 'User',
		imageUrl: dataManager.currentUser?.imageUrl || '/default_profile.png',
	});

	return (
		<div className="flex flex-row items-center gap-4">
			<Avatar className="">
				<AvatarImage src={state.imageUrl} />
				<AvatarFallback>U</AvatarFallback>
			</Avatar>
			<div>
				<div className="text-sm font-bold">{state.name}</div>
				<div className="text-xs">{state.email}</div>
			</div>
		</div>
	);
}
