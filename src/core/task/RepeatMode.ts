export enum RepeatMode {
	DAILY,
	WEEKDAYS,
	WEEKLY,
	MONTHLY,
	YEARLY,
	CUSTOM,
}

export class Repeat {
	private _mode: RepeatMode;

	constructor(mode: RepeatMode) {
		this._mode = mode;
	}
}
