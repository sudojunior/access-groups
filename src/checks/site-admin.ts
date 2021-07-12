import ConditionBuilder from '../condition';

export default new ConditionBuilder('site admin').useCheck(
	(_data, _context) => false, // Failing query
);
