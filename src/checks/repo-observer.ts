import ConditionBuilder from '../condition';
import RepoTriage from './repo-triage';

// limited access to scope view, core query expansion required
// this will read the permissions found on the access page (not those for an organization)
export default new ConditionBuilder('repo observer')
	.extend(RepoTriage)
	.runIf(data => data.repository.isInOrganization)
	.useCheck((data, context) => data.repository.collaborators.edges.some(
		edge => edge.permission === 'READ' && (edge.node.login === context.actor),
	));
