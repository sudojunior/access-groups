import {Context} from '@actions/github/lib/context';
import {DataQuery} from './util';

export interface Condition {
	key: string;
	check: ConditionPredicate;
}

type ConditionPredicate = (data: DataQuery, context: Context) => boolean;

export default class ConditionBuilder {
	private preCondition?: ConditionPredicate;
	private readonly checks: ConditionPredicate[] = [];
	private readonly inheritsFrom: Condition[] = [];
	private type: 'and' | 'or' = 'and';
	private readonly key: string;

	public constructor(key: string) {
		this.key = key;
	}

	public useCheck(predicate: ConditionPredicate): this {
		if (!this.checks.includes(predicate)) {
			this.checks.push(predicate);
		}

		return this;
	}

	public useType(type: 'and' | 'or'): this {
		this.type = type;
		return this;
	}

	public build(): Condition {
		const {
			key, type,
			preCondition, checks,
			inheritsFrom,
		} = this;

		return {
			key,
			check(data: DataQuery, context: Context) {
				if (preCondition && !preCondition(data, context)) {
					return false;
				}

				let outcome = false;

				switch (type) {
					case 'and':
						outcome = checks.every(check => check(data, context));
						break;
					case 'or':
					default:
						outcome = checks.some(check => check(data, context));
						break;
				}

				return outcome || inheritsFrom.some(c => c.check(data, context));
				// if checks is changed to array, ConditionPredicate may be used instead Condition object - that is until the key is required for inherited conditions
				// console.debug(`Condition '${key}' is found to be true through '${predicate.key}'.`)
			},
		};
	}

	public extend(condition: (Condition | ConditionBuilder)): this {
		const {key, check} = condition instanceof ConditionBuilder ? condition.build() : condition;

		if (!this.inheritsFrom.includes({key, check})) {
			this.inheritsFrom.push({key, check}); // just in-case the key can be used in future
		}

		return this;
	}

	public runIf(predicate: ConditionPredicate): this {
		this.preCondition = predicate;
		return this;
	}
}
