const assert = require('assert');

const { reverse } = require('../Services/common');

describe('Common Service Tests', function () {
	describe('reverse test', function () {
		it('Should return error message if parameter is not an array', () => {
			const data = {};

			const result = reverse(data);

			assert.ok(result);
			assert.strictEqual(typeof(result), 'string');
			assert.strictEqual(result, '"array" parameter must be an array');
		});
		it('Should reverse given array', () => {
			const data = [9, 8, 7, 6, 5];

			const result = reverse(data);

			assert.ok(result);
			assert.strictEqual(result.length, data.length);
			assert.strictEqual(result[0], 5);
			assert.strictEqual(result[1], 6);
			assert.strictEqual(result[2], 7);
			assert.strictEqual(result[3], 8);
			assert.strictEqual(result[4], 9);
		});
	});
});