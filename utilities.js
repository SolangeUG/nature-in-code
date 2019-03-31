/**
 * Round a given number to n digit after the decimal point
 * @param value to be rounded
 * @param n digits after the decimal point
 * @returns number (rounded value)
 */
function round_to_n_decimals(value, n) {
  const shifter = Math.pow(10, n);
  return Math.round(value * shifter) / shifter;
}

/**
 * Return a random integer between two values
 * @param min_value is the lower-bound value
 * @param max_value is the higher-bound value
 * @return a random value between min_value and max_value
 */
function random_value_between(min_value, max_value) {
  const offset = min_value;
  const range = max_value - min_value + 1;
  return offset + Math.floor(Math.random() * range);
}

/**
 * Return the correct bounded value from the current position
 * @param index is the current position
 * @return the bounded value which is assured to be on the grid
 */
function bounded_value(index) {
  let bounded_index = index;
  if (index < 0) {
    bounded_index  = index + grid_length;
  }
  if (index >= grid_length) {
    bounded_index = index - grid_length;
  }
  return bounded_index;
}
