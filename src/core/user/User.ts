export class User {
	private _id: string;
	private _displayName: string;
	private _email: string;
	private _imageUrl: string;

	constructor(id: string, displayName: string, email: string, imageUrl: string) {
		this._id = id;
		this._displayName = displayName;
		this._email = email;
		this._imageUrl = imageUrl;
	}

	get displayName(): string {
		return this._displayName;
	}

	get email(): string {
		return this._email;
	}

	get imageUrl(): string {
		return this._imageUrl;
	}

	get id(): string {
		return this._id;
	}
}
