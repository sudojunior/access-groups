import ConditionBuilder from '../condition';

export default new ConditionBuilder('repo owner').useCheck(
	(data, _context) => data.repository.owner.login === data.user.login,
);
