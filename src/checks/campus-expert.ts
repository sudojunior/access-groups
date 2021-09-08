import ConditionBuilder from '../condition';

export default new ConditionBuilder('campus-expert')
	.useCheck(data => data.user.isCampusExpert);
