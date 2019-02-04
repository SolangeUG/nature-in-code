// generic function to round numbers to n digits after the decimal point
export function generic_round_number(value, n) {
	const shifter = Math.pow(10, n);
	return Math.round(value * shifter) / shifter;
}
