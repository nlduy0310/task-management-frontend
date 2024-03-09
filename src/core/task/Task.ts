import { Attachment } from './Attachment';
import { Assignee } from './Assignee';
import { Repeat } from './RepeatMode';

export class Task {
	private _id: string;
	private _name: string;
	private _completed: boolean;

	private _myDayList: string[];
	private _importantList: string[];

	private _remindDate?: Date;
	private _dueDate?: Date;
	private _repeat?: Repeat;

	private _assignees: Assignee[];
	private _attachments: Attachment[];

	private _note: string;

	constructor(
		id: string,
		name: string,
		completed?: boolean,
		assignees?: Assignee[],
		attachments?: Attachment[],
		note?: string,
		myDayList?: string[],
		importantList?: string[],
		remindDate?: Date,
		dueDate?: Date
	) {
		this._id = id;
		this._name = name;
		this._completed = completed ?? false;
		this._assignees = assignees ?? [];
		this._attachments = attachments ?? [];
		this._note = note ?? '';
		this._myDayList = myDayList ?? [];
		this._importantList = importantList ?? [];
		this._remindDate = remindDate;
		this._dueDate = dueDate;
	}

	get name(): string {
		return this._name;
	}

	get myDayUsersList(): string[] {
		return this._myDayList;
	}

	get importantUsersList(): string[] {
		return this._importantList;
	}

	set importantUsersList(newList: string[]) {
		this._importantList = newList;
	}

	get assigneeIdsList(): string[] {
		return this._assignees.map((assignee) => {
			return assignee.id;
		});
	}

	get completed(): boolean {
		return this._completed;
	}

	set completed(c: boolean) {
		this._completed = c;
	}

	get id(): string {
		return this._id;
	}

	get note(): string {
		return this._note;
	}

	get remindDate(): Date | undefined {
		return this._remindDate;
	}

	get dueDate(): Date | undefined {
		return this._dueDate;
	}

	public important(userId: string): boolean {
		return this._importantList.includes(userId);
	}
}
