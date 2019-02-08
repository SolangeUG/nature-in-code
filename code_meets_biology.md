# Code Meets Biology

A little over two years ago, a friend of mine decided to change careers and learn programming. Despite our long conversations about how software development and information technology in general have had a tremendous and transformative impact on our societies, he still struggled to find any passion for his new endeavour. He thought of programming as being too abstract.

That had me thinking, and I set out to find a hands-on, and more enjoyable way for him to not only learn programming, but fall madly in love with it. In doing so, I came across a fantastic course for beginners on edX called [Nature in Code: Biology in Javascript][1]. This course shows how basic programming constructs can be used as a powerful tool to describe, understand and reason about our natural world.

In this post, we'll talk about how the aforementioned course teaches scientific ideas such as evolution and epidemics using simple models.
More specifically, we define a model as our starting point, then we'll look into how migration, one of main forces that lead to evolution is implemented. Finally, we'll look at how the spread of infectious diseases is represented in Javascipt.

## The Hardy-Weinberg Model

In biology, **evolution** is the change in genetic composition of a population over time. The course identifies four forces that lead to this change:
  - **Natural selection**, as described by Charles Darwin, where <cite>individuals with characteristics best suited to their environment are more likely to survive, reproduce and pass their genes onto their children</cite>.[<sup>1</sup>][2]
  - **Genetic drift**, where the change in genetic composition is due to random chance.
  - **Migration**, which refers to population moving from one place to another.
  - **Mutation**, which is described as the *ultimate engine of diversity creation*.

The course introduces the **Hardy-Weinberg Model** - also known as the `null` model, as being the model that describes how a system would behave without any of the forces of interest.

It relies on the following simplifying assumptions:
- an infinite population size
- non-overlapping generations
- sexual reproduction happens randomly
- and none of the four forces above is in action

Let's consider a basic model of a gene declined into two alleles a<sub>1</sub> and a<sub>2</sub>. A **gene** is defined as <cite>the basic physical and functional unit of heredity</cite>.[<sup>2</sup>][3] Every gene exists in multiple versions, called **alleles**, and these versions are the ones that make us unique.

For example, the human eye color is predominantly determined by two genes, `OCA2` and `HERC2`. This last gene comes in two versions, the `C` and the `T` alleles. The combination of those two alleles is what will (mostly) determine an individual's eye color. A person with two copies of the `C` allele will likely have blue eyes (72% probability). One with two copies of the `T` allele will likely have brown eyes (85% probability). And one with both alleles will have brown eyes with a 56% probability.

Going back to our basic model, we'll consider the **Hardy-Weinberg allele frequencies** f(a<sub>1</sub>) as `p` and f(a<sub>2</sub>) as `q` to **not change** over time. And the resulting genotype frequencies - f(a<sub>1</sub>a<sub>1</sub>), f(a<sub>1</sub>a<sub>2</sub>) and f(a<sub>2</sub>a<sub>2</sub>) - may vary within one generation, and then stabilize and never change again over time.

In Javascript, these Hardy-Weinberg frequencies are initialized as follows:

```Javascript
// generation 0 genotype frequencies
const a1a1 = 0.15;
const a2a2 = 0.35;
const a1a2 = 1 - (a1a1 + a2a2);

// allele frequencies (constant over time)
const p = a1a1 + (a1a2 / 2);
const q = 1 - p;
```

Calculating the Hardy-Weinberg model over 20 generations (for example):

```Javascript
function hardy_weinberg_model() {
	for (let gen = 1; gen <= 20; gen++) {
		genotype_new_generation();
		console.log("generation", gen, ":", a1a1, a2a2, a1a2);
	}
}

// calculating the next generation of genotype frequencies
function genotype_new_generation() {
	a1a1 = round(p * p, 2);
	a2a2 = round(q * q, 2);
	a1a2 = 2 * round(p * q, 2);
}

// round helper function
function round(value, n) {
	const shifter = Math.pow(10, n);
	return Math.round(value * shifter) / shifter;
}
```

When the simulation above is run, generation after generation, the Hardy-Weinberg genotype frequencies do not change as the allele frequencies remain constant.

## Migration

In studying migration, we build from the Hardy-Weinberg model, considering diploid individuals (having two copies of genetic material), but relax two of our previous simplifying assumptions.
- First, we no longer consider to have an infinite population size.
- Second, we are no longer assuming random sexual reproduction. Instead, we consider where individuals are in space. So, when mating, it's much more likely that an individual will choose a close-by partner, rather than an individual who is far away.

Relaxing these two assumptions gives a **spatial model**.

We represent such a model with a finite grid, where each cell contains an individual. And we add a rule about mating distance: for each individual in the grid, we define a **maximum mating distance**. For example, if we set such a distance to 1, an individual in the middle of the grid will have eight possibilities in choosing a partner.

When implementing this model, we start with allele frequencies, and grid initialization, and we set our maximum mating distance to 1.

```Javascript
// spatial model initialization
const grid_length = 100;
const p = 0.5; // p is allele a1 frequency
const grid = [];
const max_mating_distance = 1;

// generation 0 genotype frequencies
const a1a1 = 0;
const a1a2 = 0;
const a2a2 = 0;
const generation_counter = 0;
```

Then, we randomly assign individuals in the grid:

```Javascript
function init_grid() {
	for (let i = 0; i < grid_length; i++) {
		grid[i] = [];
		for (let j = 0; j < grid_length; j++) {
			let random_num = Math.random();
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
}
```

Once we have our population initialized, we look at what happens generation after generation. In other words:
- each individual chooses a mating partner in accordance with the maximum mating distance defined earlier
- then we generate the children given the parents' genotype
- and finally, we replace the parent generation with the offspring generation.

```Javascript
function pick_mating_partner(position_i, position_j) {
  let x = get_random(position_i - max_mating_distance, position_i + max_mating_distance);
  let y = get_random(position_j - max_mating_distance, position_j + max_mating_distance);
  x = get_bounded_index(x);
  y = get_bounded_index(y);
  return grid[x][y];
}
```

In the above snippet of code, `get_bounded_index` refers to a function that wraps around the grid (when necessary), well as the `get_random` returns a random value between two given values.

The function that generates the offspring once the parents' genotype is known can be broken down as follows:
- when both parents are of the same genotype, then the offspring will be of the same genotype
- when the first parent is homozygous (indentical alleles), and the other is heterozygous, a randomly generated probability determines which parent's genotype the child fully inherits from
- when both parents are homozygous, but of different genotype, a randomly generated probability determines whether the child is homozygous or heterozygous.

```Javascript
//TODO: refactor the function and add it here
```











[1]: https://courses.edx.org/courses/course-v1:EPFLx+NiC1.0x+3T2016/course/
[2]: https://www.yourgenome.org/facts/what-is-evolution
[3]: https://ghr.nlm.nih.gov/primer/basics/gene