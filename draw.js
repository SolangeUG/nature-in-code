/**
 * Draw a grid with the given data and colors
 * @param data
 * @param colors
 */
function draw_grid(data,colors) {
  const width = 600;
  const height = 600;
  const grid_length = data.length;

  let svg = d3.select('main')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const rw = Math.floor(width / grid_length);
  const rh = Math.floor(height / grid_length);

  let g = svg.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform',
          function (d, i) {
            return 'translate(0, ' + (width / grid_length) * i + ')';
          }
    );

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
    d3.selectAll(".A1A1").style("fill","#D5D8DC");
    d3.selectAll(".A1A2").style("fill","#34495E");
    d3.selectAll(".A2A2").style("fill","#85C1E9");

  } else {
    for (let i = 0; i < colors.length; i = i + 2) {
      d3.selectAll("." + colors[i]).style("fill", colors[i+1]);
    }
  }
}

/**
 * Update drawn grid with new data and colors
 * @param data
 * @param colors
 */
function update_grid(data, colors){
  d3.select('svg').selectAll('g')
    .data(data)
    .selectAll('rect')
    .data(function (d) {
      return d;
    })
    .attr('class',
          function(d) {
            return d;
          }
  );

  if (!colors) {
    d3.selectAll(".A1A1").style("fill","#D5D8DC");
    d3.selectAll(".A1A2").style("fill","#34495E");
    d3.selectAll(".A2A2").style("fill","#85C1E9");

  } else {
    for (let i = 0; i < colors.length; i = i + 2) {
      d3.selectAll("." + colors[i]).style("fill", colors[i+1]);
    }
  }
}
