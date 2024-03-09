import { Task } from './Task';

export class TaskManager {
	private _taskList: Task[];

	constructor() {
		this._taskList = Array<Task>();
	}

	public getMyDayTasks(userId: string): Task[] {
		return this._taskList.filter((task) => {
			// if the user specifically added this task to my day
			if (task.myDayUsersList.includes(userId)) return true;

			// or if it's due date is the same day as today (local time)
			const now = new Date();
			if (
				task.dueDate &&
				task.dueDate.getFullYear() === now.getFullYear() &&
				task.dueDate.getMonth() === now.getMonth() &&
				task.dueDate.getDate() === now.getDate()
			) {
				return true;
			}

			return false;
		});

		return [];
	}

	public getImportantTasks(userId: string): Task[] {
		return this._taskList.filter((task) => {
			if (task.importantUsersList.includes(userId)) return true;
		});
	}

	public getAssignedTasks(userId: string): Task[] {
		return this._taskList.filter((task) => {
			if (task.assigneeIdsList.includes(userId)) {
				return true;
			}
		});
	}

	get allTasks(): Task[] {
		return this._taskList;
	}

	set allTasks(list: Task[]) {
		this._taskList = list;
	}

	public updateCompletionStatus(taskId: string, newCompletionStatus: boolean): boolean {
		this._taskList.forEach((task) => {
			if (task.id === taskId) return (task.completed = newCompletionStatus);
		});
		return false;
	}

	public updateImportantList(taskId: string, newImportantList: string[]): boolean {
		this._taskList.forEach((task) => {
			if (task.id === taskId) return (task.importantUsersList = newImportantList);
		});
		return false;
	}

	public getTaskById(taskId: string): Task | null {
		for (let i: number = 0; i < this._taskList.length; i++) {
			if (this._taskList[i].id === taskId) return this._taskList[i];
		}
		return null;
	}
}
