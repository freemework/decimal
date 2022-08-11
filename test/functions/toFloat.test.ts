import { FDecimal } from "@freemework/common";

import { assert } from "chai";

import { FDecimalBackendBigNumber } from "../../src/index";

const fractionalDigits = 10;
const roundMode = FDecimal.RoundMode.Round;
const testBackend = new FDecimalBackendBigNumber(fractionalDigits, roundMode);


type TestCases = Array<[/*value: */string, /*expectedResult: */number, /*backends: */Array<FDecimal.Backend>]>;

const testCases: TestCases = [
	["5", 5, [testBackend]],
	["-5", -5,  [testBackend]],
	["0.1", 0.1, [testBackend]],
	["-0.1", -0.1, [testBackend]],
	["0.00000000001", 0, [testBackend]], // should be round to zero according fractionalDigits === 10
	["-0.00000000001", 0, [testBackend]] // should be round to zero according fractionalDigits === 10
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [test, expectedResult, backends] = testCase;

	backends.forEach(function (backend: FDecimal.Backend) {
		describe(`toFloat should be ${test} => ${expectedResult}`, function () {
			before(() => { FDecimal.configure(backend); });
			after(() => { (FDecimal as any)._cfg = null; });

			it("value.toNumber(): number", function () {
				const friendlyTest: FDecimal = FDecimal.parse(test);
				const result: number = friendlyTest.toNumber();
				assert.equal(result, expectedResult);
			});
		});
	});
});
