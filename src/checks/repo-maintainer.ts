import ConditionBuilder from '../condition';
import RepoAdmin from './repo-admin';

export default new ConditionBuilder('repo maintainer')
	.extend(RepoAdmin)
	.runIf(data => data.repository.isInOrganization)
	.useCheck((data, context) => data.repository.collaborators.edges.some(
		edge => edge.permission === 'MAINTAIN' && (edge.node.login === context.actor),
	));
