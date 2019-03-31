let a1a1 = 0;
let a1a2 = 0;
let a2a2 = 0;
const p = 0.5;
const grid = [];
const grid_length = 100;
let generation_counter = 0;
const max_mating_distance = 1;

/**
 * Initialize the spatial model grid
 */
function init_grid() {
  for (let i = 0; i < grid_length; i++) {
    grid[i] = [];
    for (let j = 0; j < grid_length; j++) {
      const probability = Math.random();
      if (probability < p * p) {
        grid[i][j] = "A1A1";
        a1a1++;
      } else if (probability > 1 - (1 - p) * (1 - p)) {
        grid[i][j] = "A2A2";
        a2a2++;
      } else {
        grid[i][j] = "A1A2";
        a1a2++;
      }
    }
  }
  console.log("A1A1:", a1a1, "|", "A1A2:", a1a2, "|", "A2A2:", a2a2);
  console.log("generation", generation_counter, ":", a1a1, a1a2, a2a2);
}

/**
 * Run the simulation for one generation
 */
function run_generation() {
  let temp_grid = [];
  for (let i = 0; i < grid_length; i++) {
    temp_grid[i] = [];
    for (let j = 0; j < grid_length; j++) {
      let mating_partner = pick_mating_partner(i, j);
      temp_grid[i][j] = get_offspring(grid[i][j], mating_partner);
    }
  }
  for (let i = 0; i < grid_length; i++) {
    for (let j = 0; j < grid_length; j++) {
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
  let x = random_value_between(position_i - max_mating_distance, position_i + max_mating_distance);
  let y = random_value_between(position_j - max_mating_distance, position_j + max_mating_distance);
  x = bounded_value(x);
  y = bounded_value(y);
  return grid[x][y];
}

/**
 * Return an offspring from two given individuals
 * @param parent1 is the first individual
 * @param parent2 is the mating partner
 * @return string : the offspring via the Mendelian Inheritance
 */
function get_offspring(parent1, parent2) {
  // both parents are homozygous, identical and of A1A1 genotype
  if (parent1 === "A1A1" && parent2 === "A1A1") {
    return "A1A1";
  }

  // one parent is heterozygous, and the other is homozygous of genotype A1A1
  if ((parent1 === "A1A1" && parent2 === "A1A2")
      || (parent1 === "A1A2" && parent2 === "A1A1")) {
    if (Math.random() < 0.5) {
      return "A1A1";
    }
    else {
      return "A1A2";
    }
  }

  // both parents are homozygous but not identical
  if ((parent1 === "A1A1" && parent2 === "A2A2") || (parent1 === "A2A2" && parent2 === "A1A1")) {
    return "A1A2";
  }

  // both parents are heterozygous
  if (parent1 === "A1A2" && parent2 === "A1A2") {
    const probability = Math.random();
    if (probability < 0.25) {
      return "A1A1";
    }
    else if (probability > 0.75){
      return "A2A2";
    }
    else {
      return "A1A2";
    }
  }

  // one parent is heterozygous, and the other is homozygous of genotype A2A2
  if ((parent1 === "A1A2" && parent2 === "A2A2") || (parent1 === "A2A2" && parent2 === "A1A2")) {
    if (Math.random() < 0.5) {
      return "A1A2";
    }
    else {
      return "A2A2";
    }
  }

  // both parents are homozygous, identical and of A2A2 genotype
  if (parent1 === "A2A2" && parent2 === "A2A2") {
    return "A2A2";
  }
}

/**
 * Print the computed data to the console
 */
function print_data() {
  a1a1 = 0;
  a1a2 = 0;
  a2a2 = 0;
  for (let i = 0; i < grid_length; i++) {
    for (let j = 0; j < grid_length; j++) {
      if (grid[i][j] === "A1A1") {
        a1a1++;
      } else if (grid[i][j] === "A1A2") {
        a1a2++;
      } else {
        a2a2++;
      }
    }
  }
  console.log("generation", generation_counter, ":", a1a1, a1a2, a2a2);

  const N = a1a1 + a1a2 + a2a2;
  const observed_heterozygocity = a1a2 / N;
  const p = ((2 * a1a1) + a1a2) / (2 * N);
  const expected_heterozygocity = 2 * p * (1 - p);
  const F = (expected_heterozygocity - observed_heterozygocity) / expected_heterozygocity;
  console.log("F =", F);
}


// State of the grid BEFORE running the simulation
const colors = ["A1A1", "#F4F6F6", "A1A2", "#FFCC33", "A2A2", "#DD4D00"];
init_grid();
draw_grid(grid, colors);


/**
 * Run the simulation for a hundred generations
 * and visualize the simulation
 */
function simulate_and_visualize() {
  run_generation();
  update_grid(grid, colors);
}

// State of the grid AFTER running the simulation.
// We need to use the setInterval() method in order to slow down the computations.
// Otherwise, it would happen so fast that we wouldn't be able to see the changes.
// The result is so AWESOME! The COOLEST thing I've ever done with JavaScript!
setInterval(simulate_and_visualize, 100);
