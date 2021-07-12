import ConditionBuilder from '../condition';

export default new ConditionBuilder('site admin').useCheck(
	(data, context) => context.payload?.sender?.site_admin as boolean,
);
