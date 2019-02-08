# Code Meets Biology

A little over two years ago, a friend of mine decided to change careers and learn programming. Despite our long conversations about how software development and information technology in general have had a tremendous and transformative impact on our societies, he still struggled to find any passion for his new endeavour. He thought of programming as being too abstract.

That had me thinking, and I set out to find a hands-on, and more enjoyable way for him to not only learn programming, but fall madly in love with it. In doing so, I came across a fantastic course for beginners on edX called [Nature in Code: Biology in Javascript][1]. This course shows how basic programming constructs can be used as a powerful tool to describe, understand and reason about our natural world.

In this post, we'll talk about how the aforementioned course teaches scientific ideas such as evolution and epidemics using simple models.
More specifically, we start we'll look into how migration, one of main forces that lead to evolution is implemented.

## The Hardy-Weinberg Model

In biology, **evolution** is the change in genetic composition of a population over time. The course identifies four forces that lead to this change:
  - **Natural selection**, as described by Charles Darwin, where <cite>individuals with characteristics best suited to their environment are more likely to survive, reproduce and pass their genes onto their children</cite>.[<sup>1</sup>][2]
  - **Genetic drift**, where the change in genetic composition is due to random chance.
  - **Migration**, which refers to population moving from one place to another.
  - **Mutation**, which is described as the *ultimate engine of diversity creation*.

The course introduces the **Hardy-Weinberg Model** - also known as the `null` model, as being the model that describes how a system would behave without any of the forces of interest.

It relies on the following assumptions:
- an infinite population size
- non-overlapping generations
- sexual reproduction happens randomly
- and none of the four forces above is in action

Let's consider a basic model of a gene declined into two alleles a<sub>1</sub> and a<sub>2</sub>. A **gene** is defined as <cite>the basic physical and functional unit of heredity</cite>.[<sup>2</sup>][3] Every gene exists in multiple versions, called **alleles**, and these versions are the ones that make us unique.

For example, the human eye color is predominantly determined by two genes, `OCA2` and `HERC2`. Both genes come in two versions, the `C` and the `T` alleles. The combination of those two alleles is what will determine an individual's eye color. A person with two copies of the `C` allele will likely have blue eyes (72% probability). One with two copies of the `T` allele will likely have brown eyes (85% probability). And one with both alleles will have brown eyes with a 56% probability.

Going back to our basic model, we'll consider the **Hardy-Weinberg allele frequencies** f(a<sub>1</sub>) as `p` and f(a<sub>2</sub>) as `q` to **not change** over time. And the resulting genotype frequencies - f(a<sub>1</sub>a<sub>1</sub>), f(a<sub>1</sub>a<sub>2</sub>) and f(a<sub>2</sub>a<sub>2</sub>) - may vary within one generation, and then stabilize and never change again over time.

In Javascript, these Hardy-Weinberg frequencies are initialized as follows:

```Javascript
// generation 0 genotype frequencies
const a1a1 = 0.15;
const a2a2 = 0.35;
const a1a2 = 1 - (a1a1 + a2a2);

// allele frequencies
const p = a1a1 + (a1a2 / 2);
const q = 1 - p;
```

Calculating the Hardy-Weinberg model over 20 generations (for example):

```Javascript
function hardy_weinberg_model() {
	for (let gen = 1; gen <= 20; i++) {
		genotype_new_generation();
		console.log("generation", i, ":", a1a1, a2a2, a1a2);
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


[1]: https://courses.edx.org/courses/course-v1:EPFLx+NiC1.0x+3T2016/course/
[2]: https://www.yourgenome.org/facts/what-is-evolution
[3]: https://ghr.nlm.nih.gov/primer/basics/gene
