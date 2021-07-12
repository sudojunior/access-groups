import {Context} from '@actions/github/lib/context';
import {DataQuery} from './util';

export interface Condition {
	key: string;
	check: ConditionPredicate;
}

type ConditionPredicate = (data: DataQuery, context: Context) => boolean;

export default class ConditionBuilder {
	constructor(private readonly key: string) {}

	useCheck(predicate: ConditionPredicate): ConditionBuilder {
		this.check = predicate;
		return this;
	}

	build(): Condition {
		return {
			key: this.key,
			check: this.check,
		};
	}

	private check: ConditionPredicate = () => false;
}
