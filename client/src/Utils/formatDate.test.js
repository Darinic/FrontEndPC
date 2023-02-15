import formatDate from "./formatDate.js";
import { expect, test } from "@jest/globals";

//create an array of test cases
const testCases = [
	{
		input: "2015-11-25T04:32:15.000Z",
		expected: "2015-11-25 08:32"
	},
	{
		input: "2014-02-24T23:59:59.000Z",
		expected: "2014-02-25 03:59"
	},
	{
		input: "2025-11-23T22:11:15.000Z",
		expected: "2025-11-24 02:11"
	},
	{
		input: "2020-08-05T08:00:00.000Z",
		expected: "2020-08-05 12:00"
	},
	{
		input: "2018-05-15T13:25:00.000Z",
		expected: "2018-05-15 17:25"
	}
];

test.each(testCases)(
	"formatDate should return the correct date and time",
	({ input, expected }) => {
		expect(formatDate(input)).toBe(expected);
	}
);

test("formatDate should return an empty string if the input is invalid", () => {
	expect(formatDate("")).toBe("");
	expect(formatDate(null)).toBe("");
	expect(formatDate(undefined)).toBe("");
	expect(formatDate(123)).toBe("");
});



