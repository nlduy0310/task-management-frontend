export class Attachment {
	private _localPath: string;
	private _name: string;

	private static GetFileNameFromPath(path: string): string {
		const parts = path.split('/');
		return parts[parts.length - 1];
	}

	constructor(localPath: string) {
		this._localPath = localPath;
		this._name = Attachment.GetFileNameFromPath(localPath);
	}

	get name(): string {
		return this._name;
	}
}
