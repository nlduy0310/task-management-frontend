import { MainContentEnum } from '@/lib/appStateTypes';
import useData from '@/hooks/useData';
import { DataContextType } from '@/contexts/DataProvider';
import { ReactNode, useState } from 'react';
import TaskCompactView from './TaskCompactView';

type MainPanelPropsType = {
	displayTarget: MainContentEnum;
	sideDisplayToggle: React.Dispatch<React.SetStateAction<string>>;
};

export default function MainPanel({ displayTarget, sideDisplayToggle }: MainPanelPropsType) {
	const { dataManager } = useData() as DataContextType;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, setState] = useState({});

	const generateAllTasksView = (): ReactNode[] => {
		const tasks = dataManager.taskManager.allTasks;
		return tasks.map((task) => (
			<TaskCompactView
				triggerReupdate={() => {
					setState({});
				}}
				task={task}
				sideDisplayToggle={sideDisplayToggle}
			/>
		));
	};

	const generateMyDayTasksView = (): ReactNode[] => {
		const tasks = dataManager.taskManager.getMyDayTasks(dataManager.currentUser!.id);
		return tasks.map((task) => (
			<TaskCompactView
				triggerReupdate={() => {
					setState({});
				}}
				task={task}
				sideDisplayToggle={sideDisplayToggle}
			/>
		));
	};

	const generateImportantTasksView = (): ReactNode[] => {
		const tasks = dataManager.taskManager.getImportantTasks(dataManager.currentUser!.id);
		return tasks.map((task) => (
			<TaskCompactView
				triggerReupdate={() => {
					setState({});
				}}
				task={task}
				sideDisplayToggle={sideDisplayToggle}
			/>
		));
	};

	const generateAssignedTasksView = (): ReactNode[] => {
		const tasks = dataManager.taskManager.getAssignedTasks(dataManager.currentUser!.id);
		return tasks.map((task) => (
			<TaskCompactView
				triggerReupdate={() => {
					setState({});
				}}
				task={task}
				sideDisplayToggle={sideDisplayToggle}
			/>
		));
	};

	return (
		<div className="w-full bg-white">
			{displayTarget === MainContentEnum.ALL ? (
				generateAllTasksView()
			) : displayTarget === MainContentEnum.ASSIGNED ? (
				generateAssignedTasksView()
			) : displayTarget === MainContentEnum.IMPORTANT ? (
				generateImportantTasksView()
			) : displayTarget === MainContentEnum.MYDAY ? (
				generateMyDayTasksView()
			) : (
				<div></div>
			)}
		</div>
	);
}
