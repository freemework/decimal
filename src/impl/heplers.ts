// import { Financial as FDecimal } from "@zxteam/contract";
// import { ArgumentError } from "@zxteam/errors";

// export namespace FractionDigitsGuard {
// 	export function isFraction(test: number): test is FDecimal.FractionDigits {
// 		return Number.isSafeInteger(test) && test >= 0;
// 	}
// 	export function verifyFraction(test: FDecimal.FractionDigits): test is FDecimal.FractionDigits {
// 		if (!isFraction(test)) {
// 			throw new ArgumentError("Wrong argument fraction. Expected integer >= 0");
// 		}
// 		return true;
// 	}
// }


