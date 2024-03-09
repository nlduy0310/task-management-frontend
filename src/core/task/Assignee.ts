export class Assignee {
	private static DEFAULT_IMAGE_URL: string =
		'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg';

	private _id: string;

	private _email: string;

	private _imageUrl: string;

	constructor(email: string, imageUrl?: string, id?: string) {
		this._email = email;
		this._imageUrl = imageUrl ?? Assignee.DEFAULT_IMAGE_URL;
		this._id = id ?? '';
	}

	get id(): string {
		return this._id;
	}
}
