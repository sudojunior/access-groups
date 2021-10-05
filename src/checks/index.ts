import {Condition} from '../condition';

import SiteAdmin from './site-admin';
import RepoOwner from './repo-owner';
import RepoAdmin from './repo-admin';
import RepoMaintainer from './repo-maintainer';
import RepoTriage from './repo-triage';
import RepoObserver from './repo-observer';
import BountyHunter from './bounty-hunter';
import CampusExpert from './campus-expert';
import DeveloperProgramMember from './developer-program-member';

const checks: Condition[] = [
	SiteAdmin.build(),
	RepoOwner.build(),
	RepoAdmin.build(),
	RepoMaintainer.build(),
	RepoTriage.build(),
	RepoObserver.build(),
	BountyHunter.build(),
	CampusExpert.build(),
	DeveloperProgramMember.build(),
];

export default checks;
