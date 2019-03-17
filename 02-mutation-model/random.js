/********************************************************************************
 * Homework 01                                                                  *
 *      Write a function make_child that returns "boy" 51.5% of the time and    *
 *      "girl" 48.5% of the time.				                                *
 ********************************************************************************/

/**
 * @return "boy" 51.5% of the time and "girl" 48.5% of the time
 */
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

/**
 * @param children = number of children in a family
 * @return number of boys amongst those children
 */
function boys_in_children(children) {
	var boys = 0; 
	for (var i = 0; i < children; i++) {
		if (make_child() == "boy") {
			boys++;
		}
	}
	return boys;
}

/**
 * @param children = number of children in a family
 * @return number of girls amongst those children
 */
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
//console.log(girls_in_children(10));

/********************************************************************************
 * Homework 03                                                                  *
 *      Write a function children_in_family that returns a number between 0     *
 *      and 6 with the following probabilities:	                                *
 *		0: 10% | 1: 26% | 2: 33% | 3: 18% | 4: 9% | 5: 3% | 6: 1%				*
 ********************************************************************************/

/**
 * @return the number of children in a family
 */
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

init_families();
run_simulation();
display_families();