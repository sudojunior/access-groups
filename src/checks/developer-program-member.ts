import ConditionBuilder from '../condition';

export default new ConditionBuilder('developer-program-member')
	.useCheck(data => data.user.isDeveloperProgramMember);
