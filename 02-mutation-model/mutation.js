const number_of_sequences = 100;
const sequence_length = 20;
let original_sequence = [];
let sequences = []; //population array
const BASES = ['A', 'G', 'C', 'T'];

/**
 * First generation from original sequence
 */
function first_generation() {
  first_sequence();
  for (let i = 0; i < number_of_sequences; i++) {
    sequences.push(original_sequence.slice());
  }
}

/**
 * Generate original sequence
 */
function first_sequence() {
  for (let i = 0; i < sequence_length; i++) {
    original_sequence.push(random_base(""));
  }
}

/**
 * Generate a random choice from the four DNA bases characters
 * @param current_base
 * @returns different base character
 */
function random_base(current_base) {
  let index;
  let new_base;

  do {
    index = Math.floor(Math.random() * 4);
    new_base = BASES[index];
  } while (new_base === current_base);

  return new_base;
}

/**
 * Print population sequences with provided title
 * @param title
 */
function print_sequences(title) {
  console.log(title);
  for (let i = 0; i < number_of_sequences; i++) {
    print_sequence(sequences[i]);
  }
  console.log("");
}

/**
 * Print sequence to console
 * @param sequence
 */
function print_sequence(sequence) {
  let sequence_str = "";
  for (let i = 0; i < sequence.length; i++) {
    sequence_str += " ";
    sequence_str += sequence[i];
  }
  console.log(sequence_str);
}

first_generation();
print_sequences("Generation 0");


/**
 * Mutation Model
 */
const mutation_rate = 0.0001; // per base and generation
const number_of_generations = 100;

/**
 * Simulate random mutation over time
 */
function run_generations() {
  for (let i = 0; i < number_of_generations; i++) {
    // for each generation | current generation is i
    for (let j = 0; j < sequences.length; j++) {
      // for each sequence | current sequence is sequences[j]
      for (let k = 0; k < sequences[j].length; k++) {
        // for each base | current base is sequences[j][k]
        if (Math.random() < mutation_rate) {
          sequences[j][k] = random_base(sequences[j][k]);
        }
      }
    }
  }
}

run_generations();
print_sequences("After 100 generations");
