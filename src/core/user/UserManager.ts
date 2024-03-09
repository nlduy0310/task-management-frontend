import { User } from './User';

export class UserManager {
	private _cachedUsers: User[];

	constructor(cachedUsers?: User[]) {
		this._cachedUsers = cachedUsers ?? [];
	}
}
