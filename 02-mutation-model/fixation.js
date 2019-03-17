/********************************************************************************
 * Homework 01 - Fixation | Population with Random Alleles                      *
 *      Let's create a population with random alleles!							*
 * 		Each individual is diploid (has one allele from each parent) and 		*
 * 		each person's genome has only 1 gene.						 			*
 ********************************************************************************/
var N 		= 50; 	// population
var alleles = 3;	// number of alleles in our people genome
var people 	= [];	// array that will store our people

// Each element of people = an individual, represented as an array of 2 alleles.
// For example, with 4 individuals and 3 alleles, people could be:
// people = [[0, 1], [1, 2], [2, 0], [1, 1]]

/**
 * @param num a positive integer
 * @return a random integer from 0 to num, not including num
 */
function random_number_to(num) {
	return Math.floor(Math.random() * num);
}

/**
 * use random_number_to(num)
 * @return a random integer from 0 to alleles
 */
function random_allele() {
	return random_number_to(alleles);
}

/**
 * use random_allele()
 * @return an array of 2 random alleles
 */
function random_individual() {
	var allelesArray = [];
	for (var i = 0; i < 2; i++) {
		allelesArray.push(random_allele());
	}
	return allelesArray;
}

/**
 * Fill the people array with N individuals, 
 * each being an array of 2 random alleles, 
 * using random_individual()
 */
for (var i = 0; i < N; i++) {
	people.push(random_individual());
}

//console.log(people);

/********************************************************************************
 * Homework 02 - Fixation | Random Things Out Of Our Population                 *
 *      Let's add functions to pick up random individuals, 						*
 * 		an individual's random allele, 									 		*
 * 		and a random allele out of our entire population.			 			*
 ********************************************************************************/

/**
 * @return a random element of people
 */
function random_individual_in_people() {
	var index = random_number_to(people.length);
	return people[index];
}

/**
 * @param individual = array of 2 alleles
 * @return a random allele of individual
 */
function random_individual_allele(individual) {
	var index = random_number_to(individual.length);
	return	individual[index];
}

/**
 * Pick up a random individual in our people by using random_individual_in_people(),
 * then return one of this individual's alleles (use random_individual_allele()).
 * @return one of a random individual's alleles
 */
function random_allele_in_people() {
	var individual = random_individual_in_people();
	return random_individual_allele(individual);
}

//console.log(random_individual_in_people());

/********************************************************************************
 * Homework 03 - Fixation | Generations and Plots				                *
 *      Let's : 																*
 * 		 - have a function to create a new generation 							*
 * 		 - create new generations until one allele has reached fixation			*
 * 		 - store how many of each allele are present in our population 			*
 * 		 - and display a graph						 							*
 ********************************************************************************/
var generation = 0;

function next_generation() {
    generation = generation + 1;
    var new_generation = [];

    /* Write your code here */
    var gen_individual;
    for (var i = 0; i < N; i++) {
    	gen_individual = random_individual_in_people();
    	new_generation.push(gen_individual);
    }

    people = new_generation;
}

var fixation = false;

function add_stats() {
    // This will store how many of each allele pair we have
    var allele_pair_statistics = [];
    // And this, how many of any allele
    var allele_statistics      = [];
        
    // Initialise to zero
    for (var i = 0; i < alleles; i = i + 1) {
        allele_statistics[i] = 0;
        allele_pair_statistics[i] = [];
        for (var ii = 0; ii < alleles; ii = ii + 1) {
            allele_pair_statistics[i][ii] = 0;
        }
    }
    
    // Loop over all our individuals and increment the stats for his
    // allele pair and for each allele.
    // If an allele has reached N * 2 occurrences, this allele has reached fixation.
    for (var i = 0; i < N; i = i + 1) {
        var a1 = people[i][0];
        var a2 = people[i][1];
        allele_pair_statistics[a1][a2] = allele_pair_statistics[a1][a2] + 1;
        allele_statistics[a1] = allele_statistics[a1] + 1;
        allele_statistics[a2] = allele_statistics[a2] + 1;
        if (allele_statistics[a1] == 2 * N || allele_statistics[a2] == 2 * N) {
            fixation = true;
        }
    }
    
    // Add the allele pair statistics to the data we'll plot at the end
    for (var i = 0; i < alleles; i = i + 1) {
        data[i].push(allele_statistics[i]);
        for (var ii = 0; ii < alleles; ii = ii + 1) {
            pair_data[i * alleles + ii].push(allele_pair_statistics[i][ii]);
        }
    }
}

// Initialise plot data
var data       = [];
var pair_data  = [];
for (var i = 0; i < alleles; i = i + 1) {
    data.push([]);
    for (var ii = 0; ii < alleles; ii = ii + 1) {
        pair_data.push([]);
    }
}

// Create new generations until one allele has reached fixation
add_stats();
do {
    next_generation();
    add_stats();
} while (!fixation);
