import { round } from 'helper';

/********************************************************************************
 * 							SPATIAL MODEL GRID GENERATION						*
 *******************************************************************************/
// Much needed global variables
var p 					= 0.5;
var a1a1				= 0;
var a1a2				= 0;
var a2a2				= 0;
var grid 				= [];
var grid_length 		= 100;
var generation_counter	= 0;
var max_mating_distance = 1;

/**
 * Initialize the spatial model grid
 */
function init_grid() {
	for (var i = 0; i < grid_length; i++) {
		grid[i] = [];
		for (var j = 0; j < grid_length; j++) {
			var random_num = Math.random();
			if (random_num < p * p) {
				grid[i][j] = "A1A1";
				a1a1++;
			} else if (random_num > 1 - ((1 - p) * (1 - p))) {
				grid[i][j] = "A2A2";
				a2a2++;
			} else {
				grid[i][j] = "A1A2";
				a1a2++;
			}

		}
	}
	//console.log("A1A1:", a1a1, "|", "A1A2:", a1a2, "|", "A2A2:", a2a2);
	//console.log("generation", generation_counter, ":", a1a1, a1a2, a2a2);
}

/**
 * Run the simulation for one generation
 */
function run_generation() {
	var temp_grid = [];
	for (var i = 0; i < grid_length; i++) {
		temp_grid[i] = [];
		for (var j = 0; j < grid_length; j++) {
			mating_partner = pick_mating_partner(i, j);
			temp_grid[i][j] = get_offspring(grid[i][j], mating_partner);
		}
	}
	for (var i = 0; i < grid_length; i++) {
		for (var j = 0; j < grid_length; j++) {
			grid[i][j] = temp_grid[i][j];
		}
	}
	print_data();
	generation_counter++;
}

/**
 * Pick a mating partner from the grid given the current position
 * @param position_i is the first coordinate of the current individual
 * @param position_j is the other coordinate of the current individual
 * @return a valid position in the grid
 */
function pick_mating_partner(position_i, position_j) {
	var x = get_random_int(position_i - max_mating_distance, position_i + max_mating_distance);
	var y = get_random_int(position_j - max_mating_distance, position_j + max_mating_distance);
	x = get_bounded_index(x);
	y = get_bounded_index(y);
	return grid[x][y];
}

/**
 * Return a random integer betwen two values
 * @param min_value is the lower-bound value
 * @param max_value is the higher-bound value
 * @return a random value between min_value and max_value
 */
function get_random_int(min_value, max_value) {
	var offset = min_value;
	var range = max_value - min_value + 1;
	var result = offset + Math.floor(Math.random() * range);
	return result;
}

/**
 * Return the correct bounded index from the current position
 * @param index is the current position
 * @return the bounded index which is assured to be on the grid
 */
function get_bounded_index(index) {
	var bounded_index = index;
	if (index < 0) {
		bounded_index  = index + grid_length;
	}
	if (index >= grid_length) {
		bounded_index = index - grid_length;
	}
	return bounded_index;
}

/**
 * Return an offspring from two given individuals
 * @param parent1 is the first individual
 * @param parent2 is the mating partner
 * @return the offspring via the Mendelian Inheritance
 */
function get_offspring(parent1, parent2) {

	var offspring = "";
	var random_num = 0;

	if ((parent1 == "A1A1" && parent2 == "A1A1") || (parent1 == "A2A2" && parent2 == "A2A2")) {
		offspring = parent1;
	} else if ((parent1 == "A1A1" && parent2 == "A1A2") || (parent1 == "A1A2" && parent2 == "A1A1")) {
		random_num = Math.random();
		if (random_num < 0.5) {
			offspring = "A1A1";
		} else {
			offspring = "A1A2";
		}
	} else if ((parent1 == "A1A1" && parent2 == "A2A2") || (parent1 == "A2A2" && parent2 == "A1A1")) {
		offspring = "A1A2";
	} else if (parent1 == "A1A2" && parent2 == "A1A2") {
		random_num = Math.random();
		if (random_num < 0.25) {
			offspring = "A1A1";
		} else if (random_num > 0.75) {
			offspring = "A2A2";
		} else {
			offspring = "A1A2";
		}
	} else if ((parent1 == "A2A2" && parent2 == "A1A2") || (parent1 == "A1A2" && parent2 == "A2A2")) {
		random_num = Math.random();
		if (random_num < 0.5) {
			offspring = "A2A2";
		} else {
			offspring = "A1A2";
		}
	}

	return offspring;
}

/**
 * Visualize the data computed so far
 */
function print_data() {
	a1a1 = 0;
	a1a2 = 0;
	a2a2 = 0;
	for (var i = 0; i < grid_length; i++) {
		for (var j = 0; j < grid_length; j++) {
			if (grid[i][j] == "A1A1") {
				a1a1++;
			} else if (grid[i][j] == "A1A2") {
				a1a2++;
			} else {
				a2a2++;
			}
		}
	}
	console.log("generation", generation_counter, ":", a1a1, a1a2, a2a2);

	var N = a1a1 + a1a2 + a2a2;
	var observed_heterozygocity = a1a2 / N;
	var p = ((2 * a1a1) + a1a2) / (2 * N);
	var expected_heterozygocity = 2 * p * (1 - p);
	var F = (expected_heterozygocity - observed_heterozygocity) / expected_heterozygocity;
	console.log("F =", F);
}

/**
 * Display the grid
 */
function display_grid() {
	console.log(" ");
	var line = "";
	for (var i = 0; i < grid_length; i++) {
		for (var j = 0; j < grid_length; j++) {
			line += grid[i][j] + " ";
		}
		console.log(line);
		line = "";
	}
}

/**
 * Run the simulation for a hundred generations
 */
function run_simulation() {
	for (var i = 0; i < 100; i++) {
		run_generation();
	}
}

// State of the grid BEFORE running the simulation
init_grid();
display_grid();
run_simulation();
draw_grid(grid);

/**
 * Run the simulation for a hundred generations
 * And visualize the simulation
 */
function simulate_and_visualize() {
	run_generation();
	update_grid(grid);
}

// State of the grid AFTER running the simulation.
// We need to use the setInterval() method in order to slow down the computations.
// Otherwise, it would happen so fast that we wouldn't be able to see the changes.
// The result is so AWESOME! The COOLEST thing I've ever done with JavaScript!
setInterval(simulate_and_visualize, 100);
