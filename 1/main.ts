async function readAndParse(fileName: string): [number[], number[]] {
  const text: string = await Deno.readTextFileSync(fileName);
  const lines = text.split("\n");

  const a = [] as number[];
  const b = [] as number[];

  lines.forEach((line, index) => {
    const [na, nb] = line.split("  ").map((e) => parseInt(e));

    if (Number.isNaN(na) || Number.isNaN(nb)) {
      console.log(`Line ${index} is not a number`);
      return;
    }

    a.push(na);
    b.push(nb);
  });

  return [a, b];
}

const zip = (a: number[], b: number[]) => {
  return a.map((e, i) => [e, b[i]]);
};

const pairArrays = (a: number[], b: number[]) => {
  const aa = a.sort((a, b) => a - b);
  const bb = b.sort((a, b) => a - b);

  const zipped = zip(aa, bb);

  const deltas = zipped.map(([a, b]) => Math.abs(a - b));

  const sum = deltas.reduce((acc, curr) => acc + curr, 0);

  console.log(sum);
};

const [a, b] = await readAndParse("text.txt");
pairArrays(a, b);
