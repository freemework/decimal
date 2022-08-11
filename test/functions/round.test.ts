import { FDecimal } from "@freemework/common";

import { assert } from "chai";

import { FDecimalBackendBigNumber } from "../../src/index";

const fractionalDigits = 10;
const roundMode = FDecimal.RoundMode.Round;
const testBackend = new FDecimalBackendBigNumber(fractionalDigits, roundMode);


type TestCases = Array<[
	/*value: */string,
	/*expectedResult: */string,
	/*fractionalDigits: */number,
	/*roundMode: */FDecimal.RoundMode,
	/*backends: */Array<FDecimal.Backend>,
]>;

const testCases: TestCases = [
	// Math.round(55.5) => 56
	["0.555", "0.56", 2, FDecimal.RoundMode.Round, [testBackend]],

	// Math.round(-55.5) => -55
	["-0.555", "-0.55", 2, FDecimal.RoundMode.Round, [testBackend]],

	// Math.ceil(55.5) => 56
	["0.555", "0.56", 2, FDecimal.RoundMode.Ceil, [testBackend]],

	//Math.ceil(-55.5) => -55
	["-0.555", "-0.55", 2, FDecimal.RoundMode.Ceil, [testBackend]],

	// Math.floor(55.5) => 55
	["0.555", "0.55", 2, FDecimal.RoundMode.Floor, [testBackend]],

	// Math.floor(-55.5) => -56
	["-0.555", "-0.56", 2, FDecimal.RoundMode.Floor, [testBackend]],

	["0.555", "0.55", 2, FDecimal.RoundMode.Trunc, [testBackend]],
	["-0.555", "-0.55", 2, FDecimal.RoundMode.Trunc, [testBackend]],


	// Math.round(0.99) => 1
	["0.099", "0.1", 2, FDecimal.RoundMode.Round, [testBackend]],

	// Math.round(-0.99) => -1
	["-0.099", "-0.1", 2, FDecimal.RoundMode.Round, [testBackend]],

	// Math.ceil(0.99) => 1
	["0.099", "0.1", 2, FDecimal.RoundMode.Ceil, [testBackend]],

	//Math.ceil(-0.99) => 0
	["-0.099", "-0.09", 2, FDecimal.RoundMode.Ceil, [testBackend]],

	// Math.floor(0.99) => 0
	["0.099", "0.09", 2, FDecimal.RoundMode.Floor, [testBackend]],

	// Math.floor(-0.99) => -1
	["-0.099", "-0.1", 2, FDecimal.RoundMode.Floor, [testBackend]],

	["0.099", "0.09", 2, FDecimal.RoundMode.Trunc, [testBackend]],
	["-0.099", "-0.09", 2, FDecimal.RoundMode.Trunc, [testBackend]],


	// Math.round(0.11) => 0
	["0.011", "0.01", 2, FDecimal.RoundMode.Round, [testBackend]],

	// Math.round(-0.11) => -0
	["-0.011", "-0.01", 2, FDecimal.RoundMode.Round, [testBackend]],

	// Math.ceil(0.11) => 1
	["0.011", "0.02", 2, FDecimal.RoundMode.Ceil, [testBackend]],

	// Math.ceil(-0.11) => -0
	["-0.011", "-0.01", 2, FDecimal.RoundMode.Ceil, [testBackend]],

	// Math.floor(0.11) => 0
	["0.011", "0.01", 2, FDecimal.RoundMode.Floor, [testBackend]],

	// Math.floor(-0.11) => -1
	["-0.011", "-0.02", 2, FDecimal.RoundMode.Floor, [testBackend]],

	["0.011", "0.01", 2, FDecimal.RoundMode.Trunc, [testBackend]],
	["-0.011", "-0.01", 2, FDecimal.RoundMode.Trunc, [testBackend]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [value, expectedResult, fractionalDigits, roundMode, backends] = testCase;

	backends.forEach(function (backend: FDecimal.Backend) {
		// tslint:disable-next-line: max-line-length
		describe(`round with roundMode: ${roundMode}, fractionalDigits: ${fractionalDigits} should be ${value} => ${expectedResult}`, function () {
			before(() => { FDecimal.configure(backend); });
			after(() => { (FDecimal as any)._cfg = null; });

			it("FDecimal.round(value: FDecimal, fractionDigits: FDecimal.FractionDigits, roundMode: FDecimal.RoundMode): FDecimal", function () {
				const friendlyValue: FDecimal = FDecimal.parse(value);
				const result: FDecimal = FDecimal.round(friendlyValue, fractionalDigits, roundMode);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.round(fractionalDigits: Financial.FractionDigits, roundMode: FDecimal.RoundMode): FDecimal", function () {
				const friendlyValue: FDecimal = FDecimal.parse(value);
				const result: FDecimal = friendlyValue.round(fractionalDigits, roundMode);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
