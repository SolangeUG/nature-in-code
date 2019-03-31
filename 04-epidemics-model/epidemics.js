let grid = [];
let temp_grid = [];
const grid_length = 100;

// The SIR framework = Susceptible Infected Recovered
const beta = 0.05; // infection probability
const gamma = 0.10; // recovery probability
const rewiring_probability = 0.01;

/**
 * Initialize population with susceptible individuals
 * and randomly choose Patient 0, our infected individual
 */
function init_grid() {
  for (let i = 0; i < grid_length; i++) {
    grid[i] = [];
    for (let j = 0; j < grid_length; j++) {
      grid[i][j] = "S";
    }
  }
  let random_x = random_value_between(0, grid_length - 1);
  let random_y = random_value_between(0, grid_length - 1);
  grid[random_x][random_y] = "I";
}

/**
 * Simulate exposing neighbours of infected individuals,
 * then try recovery for those same individuals
 */
function run_SIR_simulation() {
  // Copy the current content of grid to temp_grid
  copy_grid(grid, temp_grid);

  for (let i = 0; i < grid_length; i++) {
    for (let j = 0; j < grid_length; j++) {
      if (grid[i][j] === "I") {
        expose_neighbours(i, j);
        try_recovery(i, j);
      }
    }
  }

  // Copy the new content of temp_grid to grid
  copy_grid(temp_grid, grid);
}

/**
 * Given infected individual at a particular position,
 * expose their immediate susceptible neighbours
 * as well as long distant neighbours
 * @param x (x coordinate)
 * @param y (y coordinate)
 */
function expose_neighbours(x, y) {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j < y + 1; j++) {
      if (i === x && j === y ) {
        continue;
      }
      // long distance disease transmission
      if (Math.random() < rewiring_probability) {
        let random_x = random_value_between(0, grid_length - 1);
        let random_y = random_value_between(0, grid_length - 1);
        try_infection(bounded_value(random_x), bounded_value(random_y));
      } else {
        // default case where an infected patient can only infect their immediate neighbours
        try_infection(bounded_value(i), bounded_value(j));
      }
    }
  }
}

/**
 * Try and infect current susceptible individual
 * @param x (x coordinate)
 * @param y (y coordinate)
 */
function try_infection(x, y) {
  if (grid[x][y] === "S") {
    if (Math.random() < beta) {
      temp_grid[x][y] = "I";
    }
  }
}

// Try and recover the neighbours of the current patient
/**
 * Try and recover the current patient
 * @param x (x coordinate)
 * @param y (y coordinate)
 */
function try_recovery(x, y) {
  if (grid[x][y] === "I") {
    if (Math.random() < gamma) {
      temp_grid[x][y] = "R";
    }
  }
}

/**
 * Copy content from a 2-dimensional array to another
 * @param origin
 * @param destination
 */
function copy_grid(origin, destination) {
  for (let i = 0; i < origin.length; i++) {
    destination[i] = [];
    for (let j = 0; j < origin.length; j++) {
      destination[i][j] = origin[i][j];
    }
  }
}

const colors = ["S", "#DCDCDC", "I", "#A62250", "R", "#175466"];

// State of the population BEFORE running the simulation
init_grid();
draw_grid(grid, colors);

/**
 * Run the SIR simulation and visualization
 */
function simulate_and_visualize() {
  run_SIR_simulation();

  // State of the population AFTER running the simulation
  update_grid(grid, colors);
}
setInterval(simulate_and_visualize, 50);

/**
 * Rerun simulation
 */
function rerun_simulation() {
  document.location.reload();
}
