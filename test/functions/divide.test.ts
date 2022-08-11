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
	["10", "3", "3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-10", "-3", "3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["10", "-3", "-3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-10", "3", "-3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["10", "3", "3.3333333334", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-10", "-3", "3.3333333334", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["10", "-3", "-3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-10", "3", "-3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["10", "3", "3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-10", "-3", "3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["10", "-3", "-3.3333333334", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-10", "3", "-3.3333333334", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["10", "3", "3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-10", "-3", "3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["10", "-3", "-3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-10", "3", "-3.3333333333", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],

	["1331234.3000100011", "21.02", "63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-1331234.3000100011", "-21.02", "63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["1331234.3000100011", "-21.02", "-63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-1331234.3000100011", "21.02", "-63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["1331234.3000100011", "21.02", "63331.7935304473", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-1331234.3000100011", "-21.02", "63331.7935304473", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["1331234.3000100011", "-21.02", "-63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-1331234.3000100011", "21.02", "-63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["1331234.3000100011", "21.02", "63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-1331234.3000100011", "-21.02", "63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["1331234.3000100011", "-21.02", "-63331.7935304473", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-1331234.3000100011", "21.02", "-63331.7935304473", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["1331234.3000100011", "21.02", "63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-1331234.3000100011", "-21.02", "63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["1331234.3000100011", "-21.02", "-63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-1331234.3000100011", "21.02", "-63331.7935304472", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],

	["1331234.3000100011", "21.01", "63361.9371732509", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-1331234.3000100011", "-21.01", "63361.9371732509", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["1331234.3000100011", "-21.01", "-63361.9371732509", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["-1331234.3000100011", "21.01", "-63361.9371732509", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["1331234.3000100011", "21.01", "63361.9371732509", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-1331234.3000100011", "-21.01", "63361.9371732509", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["1331234.3000100011", "-21.01", "-63361.9371732508", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["-1331234.3000100011", "21.01", "-63361.9371732508", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["1331234.3000100011", "21.01", "63361.9371732508", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-1331234.3000100011", "-21.01", "63361.9371732508", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["1331234.3000100011", "-21.01", "-63361.9371732509", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["-1331234.3000100011", "21.01", "-63361.9371732509", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],
	["1331234.3000100011", "21.01", "63361.9371732508", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-1331234.3000100011", "-21.01", "63361.9371732508", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["1331234.3000100011", "-21.01", "-63361.9371732508", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["-1331234.3000100011", "21.01", "-63361.9371732508", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],

	// Test-case: 24.2644184325 BTC need to divive to BCN price 0.00000017 should be equal 142731873.1323529411 BCN
	["24.2644184325", "0.00000017", "142731873.1323529411", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["24.2644184325", "0.00000017", "142731873.1323529412", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["24.2644184325", "0.00000017", "142731873.1323529412", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["24.2644184325", "0.00000017", "142731873.1323529411", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],

	// Test-case: 0 BTC need to divide to BCN price 0.00000017 should be equal 0.0
	["0", "0.00000017", "0", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],

	["1333.5", "21.000001", "63.49999697", [new FDecimalBackendBigNumber(8, FDecimal.RoundMode.Trunc)]],

	["1333", "21.000001", "63.47618745", [new FDecimalBackendBigNumber(8, FDecimal.RoundMode.Trunc)]],
	["1333", "21.000001", "63.47618746", [new FDecimalBackendBigNumber(8, FDecimal.RoundMode.Ceil)]],
	["1333", "21.000001", "63.47618745", [new FDecimalBackendBigNumber(8, FDecimal.RoundMode.Round)]],
	["1333", "21.000001", "63.47618745", [new FDecimalBackendBigNumber(8, FDecimal.RoundMode.Floor)]],

	["324234234234.23423456", "234.34", "1383606017.89807217", [new FDecimalBackendBigNumber(8, FDecimal.RoundMode.Trunc)]],
	// tslint:disable-next-line: max-line-length
	["123456789012345123456789012345", "212345678", "581395346376417058306.16911517", [new FDecimalBackendBigNumber(8, FDecimal.RoundMode.Trunc)]],

	["11.230707245", "1", "11.230707245", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]],
	["11.230707245", "1", "11.230707245", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Ceil)]],
	["11.230707245", "1", "11.230707245", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Round)]],
	["11.230707245", "1", "11.230707245", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Floor)]],

	["1333", "21.0001", "63.47588821", [new FDecimalBackendBigNumber(10, FDecimal.RoundMode.Trunc)]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [left, right, expectedResult, backends] = testCase;

	backends.forEach(function (backend: FDecimal.Backend) {
		// tslint:disable-next-line: max-line-length
		describe(`divide with roundMode: ${backend.settings.roundMode}, fractionalDigits: ${backend.settings.fractionalDigits} should be ${left} / ${right} = ${expectedResult}`, function () {
			before(() => { FDecimal.configure(backend); });
			after(() => { (FDecimal as any)._cfg = null; });

			it("FDecimal.divide(left: FDecimal, right: FDecimal): FDecimal", function () {
				const friendlyLeft: FDecimal = FDecimal.parse(left);
				const friendlyRight: FDecimal = FDecimal.parse(right);
				const result: FDecimal = FDecimal.divide(friendlyLeft, friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.divide(value: FDecimal): FDecimal", function () {
				const friendlyLeft: FDecimal = FDecimal.parse(left);
				const friendlyRight: FDecimal = FDecimal.parse(right);
				const result: FDecimal = friendlyLeft.divide(friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
