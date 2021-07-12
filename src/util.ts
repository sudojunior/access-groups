import {format} from 'util';
import {debug, setOutput} from '@actions/core';

export function logAndExport<T>(key: string, input: T, message: string): void {
	debug(format(`(%s) ${message}`, key, input));
	setOutput(key, input);
}

export interface DataQuery {
	repository: {
		owner: UserDataQuery;
	};
}

export interface UserDataQuery {
	isSiteAdmin: boolean;
	login: string;
	__typename: string;
}
