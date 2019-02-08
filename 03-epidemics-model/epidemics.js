/********************************************************************************
 *                EPIDEMICS - THE SPREAD OF INFECTIOUS DISEASES                 *
 *******************************************************************************/
// The SIR framework = Susceptible Infected Recovered

// Global variables
var grid_length = 100;
var grid 		= [];
var temp_grid 	= [];

var beta 		= 0.05;
var gamma 		= 0.15;
var simulations = 100;
var data		= [];
var rewiring_probability = 0.01;

// Patient 0
function init_grid() {
	for (var i = 0; i < grid_length; i++) {
		grid[i] = [];
		for (var j = 0; j < grid_length; j++) {
			grid[i][j] = "S";
		}
	}
	var random_x = get_random_int(0, grid_length - 1);
	var random_y = get_random_int(0, grid_length - 1);
	grid[random_x][random_y] = "I";
}

// Calculation Patient 1, Patient 2, ..., Patient N
function run_time_step() {
	// Copy the content of grid to temp_grid
	copy_grid(grid, temp_grid);

	for (var i = 0; i < grid_length; i++) {
		for (var j = 0; j < grid_length; j++) {
			if (grid[i][j] == "I") {
				expose_neighbours(i, j);
				try_recovery(i, j);
			}
		}	
	}

	// Copy the new content of temp_grid to grid
	copy_grid(temp_grid, grid);
}

function expose_neighbours(x, y) {
	for (var i = x - 1; i <= x + 1; i++) {
		for (var j = y - 1; j < y + 1; j++) {
			if (i == x && j == y ) {
				continue;
			}
			//Long distance disease transmission
			if (Math.random() < rewiring_probability) {
				var random_x = get_random_int(0, grid_length - 1);
				var random_y = get_random_int(0, grid_length - 1);
				try_infection(get_bounded_index(random_x), get_bounded_index(random_y));
			} else {
				// Default case where an infected patient can only infect their neighbours
				try_infection(get_bounded_index(i), get_bounded_index(j));	
			}			
		}
	}
}

// Try and infect the neighbours of the current patient
function try_infection(x, y) {
	if (grid[x][y] == "S") {
		if (Math.random() < beta) {
			temp_grid[x][y] = "I";	
		}		
	}
}

// Try and recover the neighbours of the current patient
function try_recovery(x, y) {
	if (grid[x][y] == "I") {
		if (Math.random() < gamma) {
			temp_grid[x][y] = "R";	
		}		
	}
}

// Copy content from a 2-dimensional array to another
function copy_grid(origin, destination) {
	for (var i = 0; i < origin.length; i++) {
		destination[i] = [];
		for (var j = 0; j < origin.length; j++) {
			destination[i][j] = origin[i][j];
		}
	}
}

// Cool visualizations
function simulate_and_visualize() {
	run_time_step();
	update_grid(grid, ["S", "#DCDCDC", "I", "#C82605", "R", "#6FC401"]);
}

init_grid();
draw_grid(grid, ["S", "#DCDCDC", "I", "#C82605", "R", "#6FC401"]);
setInterval(simulate_and_visualize, 1000);

function get_number_in_state(state) {
	var number_in_state = 0;
	for (var i = 0; i < grid_length; i++) {
		for (var j = 0; j < grid_length; j++) {
			if (grid[i][j] == state) {
				number_in_state++;
			}
		}
	}
	return number_in_state;
}

function get_number_of_susceptible() {
	return get_number_in_state("S");
}

function get_number_of_infected() {
	return get_number_in_state("I");
}

function get_number_of_recovered() {
	return get_number_in_state("R");
}

// Run one simulation
function run_simulation() {
	init_grid();
	while (get_number_of_infected() > 0) {
		run_time_step();
	}
}

// Run multiple simulations
function run_simulations() {
	for (var i = 0; i < simulations; i++) {
		run_simulation();
		data.push(get_number_of_recovered());
	}
}

// Calculate the average size of an array
function get_average_size(data) {
	var sum = 0; 
	for (var i = 0; i < data.length; i++) {
		sum += data[i];
	}
	return (sum / data.length);
}

/**/
run_simulations();
console.log(get_average_size(data));


/********************************************************************************
 * 						VISUALIZATION  & UTILITARIAN FUNCTIONS					*
 *******************************************************************************/
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

function draw_grid(data, colors) {
    var width = 600;
    var height = 600;
    var grid_length = data.length;

    var svg = d3.select('body').append('svg')
          .attr('width', width)
          .attr('height', height);

    var rw = Math.floor(width/grid_length);
    var rh = Math.floor(height/grid_length);

    var g = svg.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', function (d, i) {
              return 'translate(0, ' + (width/grid_length) * i + ')';
            });

    g.selectAll('rect')
            .data(function (d) {
              return d;
            })
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
              return (width/grid_length) * i;
            })
            .attr('width', rw)
            .attr('height', rh)
            .attr('class',function(d) {
              return d;
            });
    if (!colors) {
    	/*
    	d3.selectAll(".A1A1").style("fill","#fff");
        d3.selectAll(".A1A2").style("fill","#2176c9");
        d3.selectAll(".A2A2").style("fill","#042029");
        */
        d3.selectAll(".A1A1").style("fill","#F1C40F");
        d3.selectAll(".A1A2").style("fill","#229954");
        d3.selectAll(".A2A2").style("fill","#FF5733");
    }
    else {
        for (var i = 0; i < colors.length; i = i + 2) {
            d3.selectAll("."+colors[i]).style("fill",colors[i+1]);	
        }
    }
}

function update_grid(data, colors){
    var grid_length = data.length;
    d3.select('svg').selectAll('g')
        .data(data)
        .selectAll('rect')
        .data(function (d) {
          return d;
        })
        .attr('class',function(d) {
          return d;
        });
    if (!colors) {
    	/*
    	d3.selectAll(".A1A1").style("fill","#fff");
        d3.selectAll(".A1A2").style("fill","#2176c9");
        d3.selectAll(".A2A2").style("fill","#042029");
        */
        d3.selectAll(".A1A1").style("fill","#F1C40F");
        d3.selectAll(".A1A2").style("fill","#229954");
        d3.selectAll(".A2A2").style("fill","#FF5733");
    }
    else {
        for (var i = 0; i < colors.length; i = i + 2) {
            d3.selectAll("."+colors[i]).style("fill",colors[i+1]);	
        }
    }
}


/********************************************************************************
 * Homework 01 - Epidemics | Geometric Beauty - 0 			                    *					 			
 ********************************************************************************/
/**/
var grid;
var grid_width  = 151;
var grid_height = 151;
var limit = 3;

// Create a new grid
function new_grid() {
    var x;
    var y;
    grid = [];
    for ( x = 0; x < grid_width; x = x + 1) {
        grid[x] = [];
        for (y = 0; y < grid_height; y = y + 1) {
            grid[x][y] = 0;
        }
    }
    // Put a 1 in the center of the grid
    x = Math.floor(grid_width  / 2);
    y = Math.floor(grid_height / 2);
    grid[x][y] = 1;
}

// Make sure a number is between 0 and max (max not included)
function limit_number(number, max) {
    // If number is positive, return the remainder of its division by max
    if (number >= 0) return number % max;

    // If number is negative, return max minus the remainder of its negative divided by max
    if (number <  0) return max - (-number % max);
}

// Loop through all cells in the grid and recalculate their value
function recalc_grid() {
    var new_grid = [];
    for (var x = 0; x < grid_width; x = x + 1) {
        new_grid[x] = [];
        for (var y = 0; y < grid_height; y = y + 1) {
            new_grid[x][y] = value_at(x, y);
        }
    }
    grid = new_grid;
}

// Count how many 1s we have in a 3x3 square around the cell.
// Return 1 or 0 based on a simple check
function value_at(x, y) {
    var res = 0;
    for (var dx = -1; dx <= 1; dx = dx + 1) {
        for (var dy = -1; dy <= 1; dy = dy + 1) {
            var other_x = limit_number(x + dx, grid_width);
            var other_y = limit_number(y + dy, grid_height);
            res += grid[other_x][other_y];
        }
    }
    return res > 0 && res < limit ? 1 : 0;
}

// Count the number of cells in the grid that contain 1
function count_one_cells() {
	var counter = 0;
	for (var x = 0; x < grid_width; x++) {
		for (var y = 0; y < grid_height; y++) {
			if (grid[x][y] == 1) {
				counter++;
			}
		}
	}
	return counter;
}

function count_one_cells_after_recalc() {
	for (var i = 0; i < 9; i++) {
		recalc_grid();
		console.log(count_one_cells());
	}
}

/*
new_grid();
console.log(count_one_cells());
count_one_cells_after_recalc();
*/