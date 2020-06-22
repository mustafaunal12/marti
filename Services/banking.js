const findTransaction = bankTransactions =>
	transaction => {
		return bankTransactions.find(item =>
			(item.sender === transaction.sender && item.receiver === transaction.receiver) ||
			(item.sender === transaction.receiver && item.receiver === transaction.sender)
		);
	};

/**
 * Groups bank transactions by sender and buyer banks
 * @param {BankTransactionObject[]} transactions - bank transactions
 * @returns {BankTransactionObject[]} - returns bankTransaction array on success
 */
const groupBankTransactions = transactions => {
	return transactions.reduce((prev, curr) => {
		curr.amount = Number(curr.amount);
		const transaction = findTransaction(prev)(curr);

		if (transaction) {
			transaction.amount = transaction.sender === curr.sender ?
				transaction.amount + curr.amount :
				transaction.amount - curr.amount;
		} else {
			prev.push(curr);
		}

		return prev;
	}, []);
};

/**
 * Returns the result that indicates which bank owes how much to other banks
 * @param {BankTransactionObject[]} bankTransactions - bank transactions
 * @returns {string[]} - returns string array on success
 */
const writeBalancingResult = bankTransactions => {
	if (!Array.isArray(bankTransactions)) {
		return '"bankTransactions" parameter must be an array';
	}

	const transactionGroups = groupBankTransactions(bankTransactions);

	return transactionGroups
		.filter(balance => balance.amount !== 0)
		.map(balance => {
			return balance.amount > 0 ?
				`${balance.receiver} owes ${balance.sender} ${balance.amount}` :
				`${balance.sender} owes ${balance.receiver} ${-1 * balance.amount}`;
		});
};

module.exports = {
	writeBalancingResult
};