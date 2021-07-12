import ConditionBuilder from '../condition';

export default new ConditionBuilder('repo owner').useCheck(
	(data, context) => data.repository.owner.login === context.actor,
);
