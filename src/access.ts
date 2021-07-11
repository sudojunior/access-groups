import {Context} from '@actions/github/lib/context';

import checks from './checks';

export interface AccessData {
	viewer: {
		isSiteAdmin: boolean;
	};
}

interface AccessResponse {
	// {scope} {group}
	groups: string[];
	readonly highestGroup: string;
}

export function accessGroups(
	context: Context,
	data: AccessData,
): AccessResponse {
	const groups: Set<string> = new Set();

	for (const {key, check} of checks) {
		if (check(data, context)) {
			groups.add(key);
		}
	}

	return {
		groups: [...groups],
		get highestGroup() {
			return this.groups[0];
		},
	};
}
