/*******************************************************************************
 * 									HARDY-WEINBERG MODEL						*
 ******************************************************************************/

// generation 0 genotype frequencies
const a1a1 = 0.15;
const a2a2 = 0.35;
const a1a2 = 1 - (a1a1 + a2a2);

// allele frequencies
const p = a1a1 + (a1a2 / 2);
const q = 1 - p;

// initial genotype frequencies
console.log("generation", 0, ":", a1a1, a2a2, a1a2);

// calculating the Hardy-Weinberg model
function calculate_hardy_weinberg_model() {
	for (var i = 1; i <= 20; i++) {
		create_new_generation();
		console.log("generation", i, ":", a1a1, a2a2, a1a2);
	}
}

// calculating the next generation of genotype frequencies
function create_new_generation() {
	a1a1 = generic_round_number(p * p, 2);
	a2a2 = generic_round_number(q * q, 2);
	a1a2 = 2 * generic_round_number(p * q, 2);
}

// generic function to round numbers to n digits after the decimal point
function generic_round_number(value, n) {
	var shifter = Math.pow(10, n);
	return Math.round(value * shifter) / shifter;
}
