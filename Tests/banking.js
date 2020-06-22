const assert = require('assert');

const BankTransaction = require('../Domains/bankTransaction');
const { writeBalancingResult } = require('../Services/banking');

describe('Banking Service Tests', function () {
	describe('writeBalancingResult tests', function () {
		it('Should return error if parameter is not an array', () => {
			const data = {};

			const result = writeBalancingResult(data);

			assert.ok(result);
			assert.strictEqual(typeof (result), 'string');
			assert.strictEqual(result, '"bankTransactions" parameter must be an array');
		});
		it('Should return empty object if resulting balance equals to 0', () => {
			const transactions = [
				new BankTransaction('BankA', 'BankB', 10),
				new BankTransaction('BankB', 'BankA', 10)
			];

			const result = writeBalancingResult(transactions);

			assert.ok(result);
			assert.strictEqual(result.length, 0);
		});
		it('Should return "BankA owes BankB 100"', () => {
			const transactions = [
				new BankTransaction('BankB', 'BankA', 100)
			];

			const result = writeBalancingResult(transactions);

			console.log('result: ', result);

			assert.ok(result);
			assert.strictEqual(result.length, 1);
			assert.ok(result.includes('BankA owes BankB 100'));
		});
		it('Should return "BankA owes BankB 50"', () => {
			const transactions = [
				new BankTransaction('BankB', 'BankA', 100),
				new BankTransaction('BankA', 'BankB', 50)
			];

			const result = writeBalancingResult(transactions);

			console.log('result: ', result);

			assert.ok(result);
			assert.strictEqual(result.length, 1);
			assert.ok(result.includes('BankA owes BankB 50'));
		});
		it('Should return "BankB owes BankA 250", "BankB owes BankC 60", "BankA owes BankC 100"', () => {
			const transactions = [
				new BankTransaction('BankA', 'BankB', 100),
				new BankTransaction('BankB', 'BankC', 20),
				new BankTransaction('BankB', 'BankC', 120),
				new BankTransaction('BankA', 'BankB', 150),
				new BankTransaction('BankC', 'BankB', 200),
				new BankTransaction('BankC', 'BankA', 100),
			];

			const result = writeBalancingResult(transactions);

			console.log('result: ', result);

			assert.ok(result);
			assert.strictEqual(result.length, 3);
			assert.ok(result.includes('BankB owes BankA 250'));
			assert.ok(result.includes('BankB owes BankC 60'));
			assert.ok(result.includes('BankA owes BankC 100'));
		});
	});
});