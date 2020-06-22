/**
 * Returns new BankTransaction object
 * @param {string} sender - Sender bank name
 * @param {string} receiver - Receiver bank name
 * @param {number} amount - Transaction amount
 * @returns {BankTransactionObject} - BankTransaction object
 */
function BankTransaction(sender, receiver, amount) {
	return {
		sender,
		receiver,
		amount
	};
}

module.exports = BankTransaction;