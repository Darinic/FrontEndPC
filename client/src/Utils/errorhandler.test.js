import { expect, test } from "@jest/globals";
import {ExtractErrorMessage} from "./errorHandler.js";

const testCases = [
	{
		input: {
			response: {
				data: {
					Message: "This is a test error message from data-->Message"
				}
			}
		},
		expected: "This is a test error message from data-->Message"
	},
	{
		input: {
			response: {
				data: {
					errors: {
						test: ["This is a test error message from errors-->test"]
					}
				}
			}
		},
		expected: "This is a test error message from errors-->test"
	},
	{
		input: {
			response: {
				data: {
					test: "This is a test error message from data-->test"
				}
			}
		},
		expected: "An unknown error occurred"
	},
	{
		input: {
			response: {
				data: {
					errors: {
						test: ["This is a test error message from errors-->test"]
					}
				}
			}
		},
		expected: "This is a test error message from errors-->test"
	}];

test.each(testCases)(
	"ExtractErrorMessage should return the correct error message",
	({ input, expected }) => {
		expect(ExtractErrorMessage(input)).toBe(expected);
	}
);
