import ConditionBuilder from '../condition';

export default new ConditionBuilder('repo owner').useCheck(
	(data, context) => context.repo.owner === context.actor,
);
