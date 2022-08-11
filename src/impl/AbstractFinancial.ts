// import { FDecimal, FDecimalBackendNumber } from "@freemework/common";

// import * as _ from "lodash";

// export abstract class AbstractFinancial implements FDecimal {
// 	public static readonly FinancialRegExp = /^([+-]?)(0|[1-9][0-9]*)(\.([0-9]+))?$/;
// 	protected readonly _settings: Settings;

// 	protected static verify(test: string): void {
// 		if (!AbstractFinancial.FinancialRegExp.test(test)) {
// 			throw new ArgumentError(`Bad Financial value: ${test}`);
// 		}
// 	}

// 	public constructor(settings: Settings) {
// 		this._settings = settings;
// 	}

// 	public abstract abs(): FDecimal;
// 	public abstract add(value: FDecimal): FDecimal;
// 	public abstract divide(
// 		value: FDecimal, fractionalDigits: FDecimal.FractionDigits, roundMode: FDecimal.RoundMode
// 	): FDecimal;
// 	public abstract equals(value: FDecimal): boolean;
// 	public abstract gt(value: FDecimal): boolean;
// 	public abstract gte(value: FDecimal): boolean;
// 	public abstract inverse(): FDecimal;
// 	public abstract isNegative(): boolean;
// 	public abstract isPositive(): boolean;
// 	public abstract isZero(): boolean;
// 	public abstract lt(value: FDecimal): boolean;
// 	public abstract lte(value: FDecimal): boolean;
// 	public abstract max(value: FDecimal): FDecimal;
// 	public abstract min(value: FDecimal): FDecimal;
// 	public abstract mod(
// 		value: FDecimal, fractionalDigits: FDecimal.FractionDigits, roundMode: FDecimal.RoundMode
// 	): FDecimal;
// 	public abstract multiply(
// 		value: FDecimal, fractionalDigits: FDecimal.FractionDigits, roundMode: FDecimal.RoundMode
// 	): FDecimal;
// 	public abstract round(
// 		fractionalDigits: FDecimal.FractionDigits, roundMode: FDecimal.RoundMode
// 	): FDecimal;
// 	public abstract subtract(value: FDecimal): FDecimal;
// 	public abstract toFloat(): number;
// 	public abstract toInt(): number;
// 	public toString(): string { return this.raw; }

// 	protected abstract get raw(): string;
// }


