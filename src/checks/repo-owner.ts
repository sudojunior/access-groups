import ConditionBuilder from '../condition';
import {RepositoryOwnerAsUser} from '../util';

export default new ConditionBuilder('repo owner').useCheck((data, context) => {
	if (data.repository.isInOrganization) {
		return false;
	}

	const owner = data.repository.owner as RepositoryOwnerAsUser;

	return (owner.login || context.repo.owner) === context.actor;
});
