import ConditionBuilder from '../condition';
import {RepositoryOwnerAsUser} from '../util';
import SiteAdmin from './site-admin';

export default new ConditionBuilder('repo owner')
	.extend(SiteAdmin)
	.runIf(data => !data.repository.isInOrganization)
	.useCheck((data, context) => {
		const owner = data.repository.owner as RepositoryOwnerAsUser;

		return (owner.login || context.repo.owner) === context.actor;
	});
