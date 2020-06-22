/**
 * Reverses an array
 * @param {object[]} array - any array
 * @returns {object[]} - reversed array
 */
const reverse = array => {
	if (!Array.isArray(array)) {
		return '"array" parameter must be an array';
	}

	const totalIndex = array.length - 1;
	const result = [];

	array.forEach((element, index) => {
		result[totalIndex - index] = element;
	});

	return result;
};

module.exports = {
	reverse
};