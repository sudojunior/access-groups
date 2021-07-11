import {Condition} from '../condition';

import SiteAdmin from './site-admin';
import RepoOwner from './repo-owner';

const checks: Condition[] = [SiteAdmin.build(), RepoOwner.build()];

export default checks;
