import ConditionBuilder from '../condition';
import RepoMaintainer from './repo-maintainer';

export default new ConditionBuilder('repo triage')
	.extend(RepoMaintainer)
	.runIf(data => data.repository.isInOrganization)
	.useCheck((data, context) => data.repository.collaborators.edges.some(
		edge => edge.permission === 'TRIAGE' && (edge.node.login === context.actor),
	));
