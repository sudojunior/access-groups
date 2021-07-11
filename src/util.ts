import {format} from 'util';
import {debug, setOutput} from '@actions/core';

export function logAndExport<T>(key: string, input: T, message: string): void {
	debug(format(`(%s) ${message}`, key, input));
	setOutput(key, input);
}

export interface DataQuery {
	viewer: {
		isSiteAdmin: boolean;
	};
}
