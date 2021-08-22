import {Condition} from '../condition';

import SiteAdmin from './site-admin';
import RepoOwner from './repo-owner';
import RepoAdmin from './repo-admin';

const checks: Condition[] = [
	SiteAdmin.build(),
	RepoOwner.build(),
	RepoAdmin.build(),
];

export default checks;
