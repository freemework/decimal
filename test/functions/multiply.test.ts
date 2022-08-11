import { FDecimal } from "@freemework/common";

import { assert } from "chai";

import { FDecimalBackendBigNumber } from "../../src/index";

type TestCases = Array<[
	/*left: */string,
	/*right: */string,
	/*expectedResult: */string,
	/*backends: */Array<FDecimal.Backend>
]>;

const testCases: TestCases = [
	["0.5", "3.3333333333", "1.6666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-0.5", "3.3333333333", "-1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-0.5", "-3.3333333333", "1.6666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["0.5", "-3.3333333333", "-1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["0.5", "3.3333333333", "1.6666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-0.5", "3.3333333333", "-1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-0.5", "-3.3333333333", "1.6666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["0.5", "-3.3333333333", "-1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["0.5", "3.3333333333", "1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-0.5", "3.3333333333", "-1.6666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-0.5", "-3.3333333333", "1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["0.5", "-3.3333333333", "-1.6666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["0.5", "3.3333333333", "1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-0.5", "3.3333333333", "-1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-0.5", "-3.3333333333", "1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["0.5", "-3.3333333333", "-1.6666666666", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],

	["0.5000000001", "3.3333333333", "1.666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-0.5000000001", "3.3333333333", "-1.666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-0.5000000001", "-3.3333333333", "1.666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["0.5000000001", "-3.3333333333", "-1.666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["0.5000000001", "3.3333333333", "1.666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-0.5000000001", "3.3333333333", "-1.6666666669", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-0.5000000001", "-3.3333333333", "1.666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["0.5000000001", "-3.3333333333", "-1.6666666669", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["0.5000000001", "3.3333333333", "1.6666666669", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-0.5000000001", "3.3333333333", "-1.666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-0.5000000001", "-3.3333333333", "1.6666666669", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["0.5000000001", "-3.3333333333", "-1.666666667", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["0.5000000001", "3.3333333333", "1.6666666669", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-0.5000000001", "3.3333333333", "-1.6666666669", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-0.5000000001", "-3.3333333333", "1.6666666669", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["0.5000000001", "-3.3333333333", "-1.6666666669", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [left, right, expectedResult, backends] = testCase;

	backends.forEach(function (backend: FDecimal.Backend) {
		// tslint:disable-next-line: max-line-length
		describe(`multiply with roundMode: ${backend.settings.roundMode}, fractionalDigits: ${backend.settings.fractionalDigits} should be ${left} * ${right} = ${expectedResult}`, function () {
			before(() => { FDecimal.configure(backend); });
			after(() => { (FDecimal as any)._cfg = null; });

			it("FDecimal.multiply(left: FDecimal, right: FDecimal): FDecimal", function () {
				const friendlyLeft: FDecimal = FDecimal.parse(left);
				const friendlyRight: FDecimal = FDecimal.parse(right);
				const result: FDecimal = FDecimal.multiply(friendlyLeft, friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.multiply(value: FDecimal): FDecimal", function () {
				const friendlyLeft: FDecimal = FDecimal.parse(left);
				const friendlyRight: FDecimal = FDecimal.parse(right);
				const result: FDecimal = friendlyLeft.multiply(friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});