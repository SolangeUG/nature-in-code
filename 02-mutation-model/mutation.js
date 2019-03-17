/********************************************************************************
 * 								UTILITARIAN FUNCTIONS							*
 *******************************************************************************/
// Math.random() : return a random number between 0 (inclusive) and 1 (exclusive).
// Math.floor() : round a number downward to its nearest integer.


/********************************************************************************
 * 								ORIGINAL DNA GENERATION							*
 *******************************************************************************/
var number_of_sequences = 100;
var sequence_length = 20;
var original_sequence = [];
var sequences = [];	//population array
var BASES = ['A', 'G', 'C', 'T']; // this is meant to be a constant!

// Generate the first generation from the first sequence
function generate_first_generation() {
	generate_first_sequence();
	for (var i = 0; i < number_of_sequences; i++) {
		sequences.push(original_sequence.slice());
	}
}

// Generate the first sequence
function generate_first_sequence() {
	for (var i = 0; i < sequence_length; i++) {
		original_sequence.push(random_base(""));
	}
}

// Generate a random choice of the four DNA bases characters
function random_base(current_base) {
	var index;
	var new_base;
		
	do {
		index = Math.floor(Math.random() * 4);
		new_base = BASES[index];
	} while (new_base == current_base);
	
	return new_base;
}

// Print the population sequences to the console
function print_sequences(title) {
	console.log(title);
	for (var i = 0; i < number_of_sequences; i++) {
		print_sequence(sequences[i]);
	}
	console.log("");
}

// Print one sequence to the console
function print_sequence(sequence) {
	var sequence_str = "";
	for (var i = 0; i < sequence.length; i++) {
		sequence_str += sequence[i]; 
	}
	console.log(sequence_str);
}

//generate_first_generation();
//print_sequences("Generation 0");

/********************************************************************************
 * 								DNA & MUTATION MODEL							*
 *******************************************************************************/
// Introducing mutations in the first generation
var mutation_rate = 0.0001; // per base and generation
var number_of_generations = 100;

function run_generations() {
	for (var i = 0; i < number_of_generations; i++) {
 		// for each generation | current generation is i
 		for (var j = 0; j < sequences.length; j++) {
 			// for each sequence | current sequence is sequences[j]
 			for (var k = 0; k < sequences[j].length; k++) {
 				// for each base | current base is sequences[j][k]
 				if (Math.random() < mutation_rate) {
 					sequences[j][k] = random_base(sequences[j][k]);	
 				} 				
 			}
 		}
 	}
}

//run_generations();
//print_sequences("After 100 generations");

/********************************************************************************
 * 							FIXATION & MUTATION MODEL							*
 *******************************************************************************/
var p;
var N = 100;
var simulations = 100000;
var fixations_of_mutant = 0;
var total_generations = 0;

function next_generation() {
	var draws = 2 * N;
	var a1 = 0;
	var a2 = 0;
	for (var i = 0; i < draws; i++) {
		if (Math.random() <= p) {
			a1++;
		} else {
			a2++;
		}
	}
	p = a1 / draws;
}

function run_until_fixation() {
	p = 1 / (2 * N);
	var generations = 0;
	do {
		next_generation();
		generations++;
	} while (p > 0 && p < 1);
	if (p == 1) {
		fixations_of_mutant++;
		total_generations += generations;
	}
}

function run_simulations() {
	for (var i = 0; i < simulations; i++) {
		run_until_fixation();
	}
	console.log(total_generations / fixations_of_mutant);
}

run_simulations();



/********************************************************************************
 * 								CODING EXERCISES								*
 *******************************************************************************/
// Math.random() : return a random number between 0 (inclusive) and 1 (exclusive)
var x1 = Math.random();
var x2 = Math.random();
//console.log('x1 =', x1, 'x2 =', x2);

var p1 = Math.random() * 10;
var p2 = Math.random(10);
var p3 = Math.random() * 2 - 1;
var p4 = Math.round(Math.random() / 2);
//console.log('p1 =', p1, 'p2 =', p2, 'p3 =', p3, 'p4 =', p4);



/********************************************************************************
 * Homework 01                                                                  *
 *      Write a function make_child that returns "boy" 51.5% of the time and    *
 *      "girl" 48.5% of the time.				                                *
 ********************************************************************************/

function make_child() {
	var child = "";
	if (Math.random() <= 0.485) {
		child = "girl";
	} else {
		child = "boy";
	}
	return child;
}

/********************************************************************************
 * Homework 02                                                                  *
 *      Write a function boys_in_children that takes as argument the number of  *
 *      children and returns the number of boys amongst those children.	        *
 ********************************************************************************/

function boys_in_children(children) {
	var boys = 0; 
	for (var i = 0; i < children; i++) {
		if (make_child() == "boy") {
			boys++;
		}
	}
	return boys;
}

function girls_in_children(children) {
	var girls = 0; 
	for (var i = 0; i < children; i++) {
		if (make_child() == "girl") {
			girls++;
		}
	}
	return girls;	
}

//console.log(boys_in_children(10));

/********************************************************************************
 * Homework 03                                                                  *
 *      Write a function children_in_family that returns a number between 0     *
 *      and 6 with the following probabilities:	                                *
 *		0: 10% | 1: 26% | 2: 33% | 3: 18% | 4: 9% | 5: 3% | 6: 1%				*
 ********************************************************************************/

function children_in_family() {
	var result;
	var probability = Math.random();

	if (probability <= 0.01) {
		result = 6;
	} else if (probability <= 0.04) {
		result = 5;
	} else if (probability <= 0.13) {
		result = 4;
	} else if (probability <= 0.23) {
		result = 0;
	} else if (probability <= 0.41) {
		result = 3;
	} else if (probability <= 0.67) {
		result = 1;
	} else {
		result = 2;
	}
	return result;
}

/********************************************************************************
 * Homework 04                                                                  *
 *      Write a program that will simulate a population of 100,000 families and *
 *      output the percentage of families with 0 boys, 1 boy, 2 boys... 6 boys  *
 * 		amongst their children to the console, and the same for girls			*
 *		(0 girls, 1 girls, etc. amongst their children).						*
 * 		The output should look like: 											*
 * 		Boys 0: 32.96% 1: 39.03% 2: 20.3% 3: 6.09% 4: 1.4% 5: 0.2% 6: 0.01%		* 
 *		Girls 0: 35.27% 1: 39.26% 2: 18.9% 3: 5.29% 4: 1.12% 5: 0.16% 6: 0.02%	*
 ********************************************************************************/

/**
 * @param value is the value to be rounded
 * @param n is the number of digits after the decimal point
 * @return the rounded number
 */
function generic_round_number(value, n) {
	var shifter = Math.pow(10, n);
	return Math.round(value * shifter) / shifter;	
}

var N = 100000; // number of families
var children_per_family = [0, 1, 2, 3, 4, 5, 6];
var families_with_boys = [];
var families_with_girls = [];
var L = children_per_family.length;

function display_families() {
	var boys_str = "";
	var girls_str = "";
	for (var i = 0; i < L; i++) {
		boys_str += families_with_boys[i][0] + ": " + families_with_boys[i][1] + " % | ";
		girls_str += families_with_girls[i][0] + ": " + families_with_girls[i][1] + " % | ";
	}
	console.log("Boys  ", boys_str);
	console.log("Girls ", girls_str);
}

function init_families() {
	for (var i = 0; i < L; i++) {
		families_with_boys.push([children_per_family[i], 0]);
		families_with_girls.push([children_per_family[i], 0]);
	}
}

function run_simulation() {
	var boys = 0;
	var girls = 0;
	var children = 0;
	for (var i = 0; i < N; i++) {
		children = children_in_family();
		boys = boys_in_children(children);
		girls = children - boys;
		for (var j = 0; j < L; j++) {
			if (boys == families_with_boys[j][0]) {
				families_with_boys[j][1]++;
			}
			if (girls == families_with_girls[j][0]) {
				families_with_girls[j][1]++;
			}
		}
	}

	//Compute percentages
	for (var k = 0; k < L; k++) {
		families_with_boys[k][1] = generic_round_number((families_with_boys[k][1] / N) * 100, 3);
		families_with_girls[k][1] = generic_round_number((families_with_girls[k][1] / N) * 100, 3);
	}
}

//init_families();
//run_simulation();
//display_families();    


/********************************************************************************
 * Homework 05                                                                  *
 *      Complete the code below, so that, using the for loop, it prints all     *
 *      integers from 1 to 5 to the console. 	                                *
 *		Ensure all variables are declared using the var keyword.				*
 ********************************************************************************/
for (var i = 1; i <= 5 ; i++) {
    //console.log(i);
}


/********************************************************************************
 * Homework 06                                                                  *
 *      We'd like to print to the console the value of p, after dividing it by  *
 *      2 in a loop, until it becomes smaller than 0.01.                        *
 *		Complete the code so that the do while loop stops when p < 0.01.		*
 ********************************************************************************/
var p = 1;
do {
    p = p / 2;
    //console.log(p);
} while (p >= 0.01);


/********************************************************************************
 * Homework 07                                                                  *
 *      Write a function dice that returns a random number between 1 and 6.		*
 ********************************************************************************/
function dice() {
	var number = Math.ceil(Math.random() * 6);
 	return number; 
}

//console.log(dice());


/********************************************************************************
 * Homework 08                                                                  *
 *      If you flip a fair coin 20 times, what is the expected probability 		*
 *      that not more than 8 heads come up?				                        *
 ********************************************************************************/
var flips = 20;
var simulations = 1000;

// Write your code after this line
function flipCoin(flips) {
    var heads = 0; 
    for (var i = 0; i < flips; i++) {
        if (Math.random() > 0.5) {
            heads++;
        }
    }
    
    var result = false;
    if (heads <= 8) {
        result = true;
    }
    return result;
}

function getHeadsProbability(simulations) {
    var counter = 0;
    for (var i = 0; i < simulations; i++) {
        if (flipCoin(flips)) {
            counter++;
        }
    }
    return counter / simulations;
}

//console.log(getHeadsProbability(simulations));


/********************************************************************************
 * Homework 09                                                                  *
 *      Same exercise as above, but assume your coin is not fair: 				*
 *      heads will turn up only 40% of the time, instead of 50%                 *
 ********************************************************************************/
var flips = 20;
var simulations = 100;

// Write your code after this line
var unfairProbability = 0.4;

function flipUnfairCoin(flips, headsProbability) {
    var heads = 0; 
    for (var i = 0; i < flips; i++) {
        if (Math.random() <= headsProbability) {
            heads++;
        }
    }
    
    var result = false;
    if (heads <= 8) {
        result = true;
    }
    return result;
}

function getHeadsResult(simulations) {
    var counter = 0;
    for (var i = 0; i < simulations; i++) {
        if (flipUnfairCoin(flips, unfairProbability)) {
            counter++;
        }
    }
    return counter / simulations;
}

//console.log(getHeadsResult(simulations));

/********************************************************************************
 * Homework 10                                                                  *
 *      Modify the code so that it stops whenever an allele disappears 			*
 *      (p is either 0 or 1).									                *
 ********************************************************************************/
function round_number(value, decimals) {
    var shifter = Math.pow(10, decimals);
    return Math.round(value * shifter) / shifter;
}

var p = 0.5;
var N = 100;
var generations = 1000;

function next_generation() {
    var draws = 2 * N;
    var a1 = 0;
    var a2 = 0;
    for (var i = 0; i < draws; i = i + 1) {
        if (Math.random() <= p) {
            a1 = a1 + 1;
        } else {
            a2 = a2 + 1;
        }
    }
    p = a1 / draws;
}

for (var i = 0; i < generations && p > 0 && p < 1; i = i + 1) {
    next_generation();
    console.log("generation " + i 
              + ":\tp = " + round_number(p, 3) 
              + "\tq = " + round_number(1 - p, 3));
}
