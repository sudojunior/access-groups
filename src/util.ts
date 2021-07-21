import {format} from 'util';
import {debug, setOutput} from '@actions/core';

import {} from '@octokit/types/dist-types/';

export function logAndExport<T>(key: string, input: T, message: string): void {
	debug(format(`(%s) ${message}`, key, input));
	setOutput(key, input);
}

export interface DataQuery {
	user: User;
	repository: Repository;
}

export interface User {
	isSiteAdmin: boolean;
	isBountyHunter: boolean;
	isCampusExpert: boolean;
	isDeveloperProgramMember: boolean;
}

export interface Repository {
	isInOrganization: boolean;
	owner: RepositoryOwnerUnion;
	collaborators: {
		edges: RepositoryCollaborator[];
	};
}

export type RepositoryOwnerUnion = RepositoryOwnerAsUser | RepositoryOwnerAsOrganization;

interface RepositoryOwner {
	__typename: string;
	hasSponsorsListing: boolean;
	isSponsoredBy: boolean; // (accountLogin: $actor)
}

interface RepositoryOwnerAsUser extends RepositoryOwner {
	login: string;
}

interface RepositoryOwnerAsOrganization extends RepositoryOwner {
	membersWithRole: {
		edges: {
			role: 'MEMBER' | 'ADMIN';
			node: {
				login: string;
			};
		};
	};
}

interface RepositoryCollaborator {
	node: {
		login: string;
	};
	permission: RepositoryPermission;
}

type RepositoryPermission = 'ADMIN' | 'MAINTAIN' | 'WRITE' | 'TRIAGE' | 'READ';
