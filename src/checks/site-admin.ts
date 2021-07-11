import ConditionBuilder from '../condition';

export default new ConditionBuilder('site admin').useCheck(
	data => data.viewer.isSiteAdmin,
);
