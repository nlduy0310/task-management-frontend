import { Checkbox } from '@/components/ui/checkbox';
import { Toggle } from '@/components/ui/toggle';
import { Task } from '@/core/task/Task';
import { CiCalendar } from 'react-icons/ci';
import { CiStar } from 'react-icons/ci';
import useData from '@/hooks/useData';
import { DataContextType } from '@/contexts/DataProvider';

type TaskCompactViewPropsType = {
	task: Task;
	triggerReupdate: () => void;
	sideDisplayToggle: React.Dispatch<React.SetStateAction<string>>;
};

export default function TaskCompactView({
	task,
	triggerReupdate,
	sideDisplayToggle,
}: TaskCompactViewPropsType) {
	const { dataManager } = useData() as DataContextType;

	return (
		<div className="flex flex-row items-center gap-4 bg-cyan-200 p-2 m-2 rounded-lg cursor-pointer">
			<Checkbox
				className="ms-3 w-5 h-5 flex-grow-0"
				checked={task.completed}
				onClick={async function () {
					await dataManager.updateTaskCompletion(task.id, !task.completed);
					triggerReupdate();
				}}
			/>
			<div
				className="flex flex-col flex-grow"
				onClick={() => {
					sideDisplayToggle(task.id);
				}}
			>
				<span>{task.name}</span>
				{task.dueDate && (
					<div className="flex flex-row">
						<CiCalendar />
						&nbsp;
						<span className="text-xs">{`${task.dueDate.getDate()}/${task.dueDate.getMonth()}/${task.dueDate.getFullYear()}`}</span>
					</div>
				)}
			</div>
			<Toggle
				className="flex-grow-0 me-3"
				variant="outline"
				size="sm"
				defaultPressed={task.important(dataManager.currentUser!.id)}
				onClick={async function () {
					await dataManager.updateTaskImportant(task.id, task.importantUsersList);
					triggerReupdate();
				}}
			>
				<CiStar size="1.2rem"></CiStar>
			</Toggle>
		</div>
	);
}
