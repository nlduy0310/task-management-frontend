import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { IoMdClose } from 'react-icons/io';
import { Task } from '@/core/task/Task';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '@/components/ui/textarea';

type DetailPanelPropsType = {
	task: Task;
	setTargetId: React.Dispatch<React.SetStateAction<string>>;
};

export default function DetailPanel({ task, setTargetId }: DetailPanelPropsType): ReactNode {
	// if (task === null) setTargetId('');

	return (
		<div className="w-5/12 flex flex-col bg-gray-300 p-8">
			<div className="w-fit self-end">
				<Button
					className="text-right"
					variant="outline"
					size="icon"
					onClick={() => {
						setTargetId('');
					}}
				>
					<IoMdClose />
				</Button>
			</div>

			<div className="font-bold text-3xl my-8">{task.name}</div>

			<div>
				<div className="mb-2 mx-4">
					<Label className="font-bold underline">Note</Label>
				</div>

				<Textarea value={task.note} readOnly autoFocus />
			</div>

			<hr className="h-1 bg-black my-8" />

			<div className="grid grid-cols-5 my-2">
				<div className="col-span-2 font-bold underline">Remind date</div>
				{task?.remindDate ? (
					<div>{task.remindDate.toLocaleDateString()}</div>
				) : (
					<div>Unset</div>
				)}
			</div>

			<div className="grid grid-cols-5 my-2">
				<div className="col-span-2 font-bold underline">Due date</div>
				{task?.dueDate ? <div>{task.dueDate.toLocaleDateString()}</div> : <div>Unset</div>}
			</div>
		</div>
	);
}
