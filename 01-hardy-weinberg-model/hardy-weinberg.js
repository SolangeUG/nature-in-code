import { round } from 'helper';

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
function hardy_weinberg_model() {
	for (let i = 1; i <= 20; i++) {
		genotype_new_generation();
		console.log("generation", i, ":", a1a1, a2a2, a1a2);
	}
}

// calculating the next generation of genotype frequencies
function genotype_new_generation() {
	a1a1 = round(p * p, 2);
	a2a2 = round(q * q, 2);
	a1a2 = 2 * round(p * q, 2);
}
