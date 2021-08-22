import {format} from 'util';
import {debug, setOutput} from '@actions/core';

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

export interface RepositoryOwner {
	__typename: string;
	hasSponsorsListing: boolean;
	isSponsoredBy: boolean; // (accountLogin: $actor)
}

export interface RepositoryOwnerAsUser extends RepositoryOwner {
	__typename: 'User';
	login: string;
}

export interface RepositoryOwnerAsOrganization extends RepositoryOwner {
	__typename: 'Organization';
	membersWithRole: {
		edges: {
			role: 'MEMBER' | 'ADMIN';
			node: {
				login: string;
			};
		};
	};
}

export interface RepositoryCollaborator {
	node: {
		login: string;
	};
	permission: RepositoryPermission;
}

export type RepositoryPermission = 'ADMIN' | 'MAINTAIN' | 'WRITE' | 'TRIAGE' | 'READ';
