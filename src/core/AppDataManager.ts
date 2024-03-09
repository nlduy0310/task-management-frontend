import { Assignee } from './task/Assignee';
import { TaskManager } from './task/TaskManager';
import { Task } from './task/Task';
import { User } from './user/User';
import { UserManager } from './user/UserManager';
import axiosClient from '@/api/axios';

export class AppDataManager {
	public currentUser?: User;
	public accessToken: string;
	public userManager: UserManager;
	public taskManager: TaskManager;

	public static managers: AppDataManager[] = [];

	constructor() {
		// console.log('dataManager initializing');
		this.userManager = new UserManager();
		this.taskManager = new TaskManager();
		this.accessToken = '';
		// console.log('dataManager initialized');
		// AppDataManager.managers.push(this);
	}

	public async fetchCurrentUser(): Promise<boolean> {
		try {
			const response = await axiosClient.get('/user', {
				headers: { Authorization: `Bearer ${this.accessToken}` },
				withCredentials: true,
			});
			const { id, email, displayName, imageUrl } = response.data;
			if (!(id && email && displayName && imageUrl)) return false;
			this.currentUser = new User(id, displayName, email, imageUrl);
			return true;
		} catch (error) {
			const success = await this.renewAccessToken();
			if (success) {
				const result = await this.fetchCurrentUser();
				return result;
			}
			return false;
		}
	}

	public async getUser(userId: string): Promise<User | undefined> {
		try {
			const response = await axiosClient.get(`/user/${userId}`, {
				headers: { Authorization: `Bearer ${this.accessToken}` },
				withCredentials: true,
			});
			const { id, email, displayName, imageUrl } = response.data;
			if (!(id && email && displayName && imageUrl)) return undefined;
			const fetchedUser = new User(id, displayName, email, imageUrl);
			return fetchedUser;
		} catch (error) {
			const success = await this.renewAccessToken();
			if (success) {
				const result = await this.getUser(userId);
				return result;
			}
			return undefined;
		}
	}

	public async renewAccessToken(): Promise<boolean> {
		try {
			const response = await axiosClient.get('/refresh', {
				withCredentials: true,
			});
			// console.log(response);
			if (!response.data?.accessToken) {
				// console.log('access token not accompanied in response');
				return false;
			}
			console.log('resettting access token');
			this.accessToken = response.data.accessToken;
			return true;
		} catch {
			return false;
		}
	}

	public async fetchAllTasks(): Promise<boolean> {
		try {
			const response = await axiosClient.get(`/task/${this.currentUser!.id}`, {
				headers: { Authorization: `Bearer ${this.accessToken}` },
				withCredentials: true,
			});
			const responseData = response.data;
			if (!(responseData instanceof Array)) return false;
			const taskList: Task[] = await Promise.all(
				responseData.map(async (taskJson) => {
					const id = taskJson._id;
					const name = taskJson.name;
					const completed = taskJson.completed;
					const note = taskJson.note;
					const remindDate = taskJson?.remindDate
						? new Date(taskJson.remindDate)
						: undefined;
					const dueDate = taskJson?.dueDate ? new Date(taskJson.dueDate) : undefined;
					const assigneeIdsList = taskJson.assignees;
					const assigneesList = await this.getAssigneesFromIds(assigneeIdsList);
					const myDayList = taskJson.myDayList;
					const importantList = taskJson.importantList;

					return new Task(
						id,
						name,
						completed,
						assigneesList,
						undefined,
						note,
						myDayList,
						importantList,
						remindDate,
						dueDate
					);
				})
			);
			this.taskManager.allTasks = taskList;
			return true;
		} catch (error) {
			const success = await this.renewAccessToken();
			if (success) {
				const result = await this.fetchCurrentUser();
				return result;
			}
			return false;
		}
	}

	public async getAssigneesFromIds(assigneeIds: string[]): Promise<Assignee[]> {
		const rawResults = await Promise.all(
			assigneeIds.map(async (assigneeId): Promise<Assignee | undefined> => {
				const res = await this.getUser(assigneeId);
				if (res !== undefined) return new Assignee(res.email, res.imageUrl, res.id);
				return undefined;
			})
		);
		const result = rawResults.filter((rs): rs is Assignee => {
			return rs !== undefined;
		});
		return result;
	}

	public async updateTaskCompletion(
		taskId: string,
		newTaskCompletionStatus: boolean
	): Promise<boolean> {
		try {
			await axiosClient.patch(
				`/task/${taskId}`,
				JSON.stringify({
					completed: newTaskCompletionStatus,
				}),
				{
					headers: {
						Authorization: `Bearer ${this.accessToken}`,
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			this.taskManager.updateCompletionStatus(taskId, newTaskCompletionStatus);
			return true;
		} catch (error) {
			const success = await this.renewAccessToken();
			if (success) {
				const result = await this.updateTaskCompletion(taskId, newTaskCompletionStatus);
				return result;
			}
			return false;
		}
	}

	public async updateTaskImportant(
		taskId: string,
		taskImportantList: string[]
	): Promise<boolean> {
		try {
			let newTaskImportantList: string[] = [];
			if (taskImportantList.includes(this.currentUser!.id)) {
				newTaskImportantList = taskImportantList.filter(
					(iid) => iid !== this.currentUser!.id
				);
			} else {
				newTaskImportantList = [...taskImportantList, this.currentUser!.id];
			}
			await axiosClient.patch(
				`/task/${taskId}`,
				JSON.stringify({
					importantList: newTaskImportantList,
				}),
				{
					headers: {
						Authorization: `Bearer ${this.accessToken}`,
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			

			return true;
		} catch (error) {
			const success = await this.renewAccessToken();
			if (success) {
				const result = await this.updateTaskImportant(taskId, taskImportantList);
				return result;
			}
			return false;
		}
	}
}
