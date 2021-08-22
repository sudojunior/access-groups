import ConditionBuilder from '../condition';

export default new ConditionBuilder('repo admin').useCheck((data, context) =>
	data.repository.collaborators.edges.some(
		edge => edge.permission === 'ADMIN' && (edge.node.login === context.actor),
	),
);
