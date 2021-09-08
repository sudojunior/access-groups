import ConditionBuilder from '../condition';
import SiteAdmin from './site-admin';

export default new ConditionBuilder('repo admin')
	.extend(SiteAdmin) // site admin is granted access to all repos (even if they aren't a contributor to the repo)
	.runIf(data => data.repository.isInOrganization)
	.useCheck((data, context) => data.repository.collaborators.edges.some(
		edge => edge.permission === 'ADMIN' && (edge.node.login === context.actor),
	));
