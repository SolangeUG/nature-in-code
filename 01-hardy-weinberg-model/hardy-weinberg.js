let a1a1 = 0.15;
let a2a2 = 0.35;
let a1a2 = 1 - (a1a1 + a2a2);

// Allele frequencies
const p = a1a1 + (a1a2 / 2);
const q = 1 - p;

// Initial genotype frequencies
console.log("generation", 0, ":", a1a1, a2a2, a1a2);

/**
 * Calculate next generation data
 */
function next_generation() {
  a1a1 = round_to_n_decimals(p * p, 2);
  a2a2 = round_to_n_decimals(q * q, 2);
  a1a2 = 2 * round_to_n_decimals(p * q, 2);
}

/**
 * Calculate the Hardy-Weinberg model
 */
function hardy_weinberg_model() {
  for (let i = 1; i <= 20; i++) {
    next_generation();
    console.log("generation", i, ":", a1a1, a2a2, a1a2);
  }
}

hardy_weinberg_model();
