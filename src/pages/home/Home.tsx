import OverviewPanel from './OverviewPanel/OverviewPanel';
import MainPanel from './MainPanel/MainPanel';
import DetailPanel from './DetailPanel';
import { useEffect, useState } from 'react';
import { MainContentEnum } from '@/lib/appStateTypes';
import { Navigate } from 'react-router-dom';
import useData from '@/hooks/useData';
import { DataContextType } from '@/contexts/DataProvider';

const enum HomeState {
	PENDING,
	FAIL,
	SUCCESS,
}

export default function Home() {
	const [pageState, setPageState] = useState(HomeState.PENDING);
	const [mainDisplay, setMainDisplay] = useState(MainContentEnum.NONE);
	const [sideDisplayId, setSideDisplayId] = useState('');
	const { dataManager } = useData() as DataContextType;

	useEffect(() => {
		async function foo() {
			const success = await dataManager.renewAccessToken();
			if (success) {
				await dataManager.fetchCurrentUser();
				await dataManager.fetchAllTasks();
				setPageState(HomeState.SUCCESS);
			} else {
				setPageState(HomeState.FAIL);
			}
		}
		foo();
	});

	const loadMyDay = () => {
		setMainDisplay(MainContentEnum.MYDAY);
	};

	const loadImportant = () => {
		setMainDisplay(MainContentEnum.IMPORTANT);
	};

	const loadAssigned = () => {
		setMainDisplay(MainContentEnum.ASSIGNED);
	};

	const loadAll = () => {
		setMainDisplay(MainContentEnum.ALL);
	};
	return pageState === HomeState.PENDING ? (
		<div>Pending</div>
	) : pageState === HomeState.FAIL ? (
		<Navigate to="/signin" state={{ from: location }} replace />
	) : (
		<div className="flex flex-row h-full w-full">
			<OverviewPanel
				className="h-full border-solid bg-gray-300"
				loadMyDay={loadMyDay}
				loadImportant={loadImportant}
				loadAssigned={loadAssigned}
				loadAll={loadAll}
			></OverviewPanel>
			<MainPanel displayTarget={mainDisplay} sideDisplayToggle={setSideDisplayId}></MainPanel>
			{sideDisplayId.length > 0 && (
				<DetailPanel
					task={dataManager.taskManager.getTaskById(sideDisplayId)!}
					setTargetId={setSideDisplayId}
				></DetailPanel>
			)}
		</div>
	);
}
