import ConditionBuilder from '../condition';

export default new ConditionBuilder('site admin')
	.useCheck((data, _context) => data.user.isSiteAdmin);
