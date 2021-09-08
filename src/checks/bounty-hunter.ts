import ConditionBuilder from '../condition';

export default new ConditionBuilder('bounty-hunter')
	.useCheck(data => data.user.isBountyHunter);
