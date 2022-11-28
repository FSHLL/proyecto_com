import { j as json } from './index2-93776cd1.js';
import * as MiniZinc from 'minizinc';

const POST = async ({ request }) => {
  var _a, _b;
  const m = new MiniZinc.Model();
  const topics = [];
  const min_pages = [];
  const max_pages = [];
  const lectors = [];
  const body = await request.json();
  body.topics.map((topic) => {
    topics.push(topic.topic);
    min_pages.push(topic.minPages);
    max_pages.push(topic.maxPages);
    lectors.push(topic.numPotentialReaders);
  });
  const model = `
    int: n;
    int: paginas;
    
    array[1..n] of int: pagMin;
    array[1..n] of int: pagMax;
    array[1..n] of int: lectores;
    
    array[1..n] of var int: datos;
    
    constraint forall(i in 1..n) (datos[i] >= 0 \\/ datos[i] >= pagMin[i]);
    constraint forall(j in 1..n) (datos[j] <= pagMax[j]);
    constraint sum(k in 1..n) (datos[k]) <= paginas;
    solve maximize sum(l in 1..n) (datos[l] * lectores[l]);
    output ["{%datos%:", show(datos), ", %lectores%:", show(sum(l in 1..n) (datos[l] * lectores[l])), "}"]
    `;
  const data = `
        n = ${topics.length};
        paginas = ${body.total_paginas};
        pagMin = [${min_pages}];
        pagMax = [${max_pages}];
        lectores = [${lectors}];
    `;
  m.addString(model);
  m.addDznString(data);
  const result = await m.solve({
    options: {
      solver: "Chuffed",
      "all-solutions": true
    }
  });
  const solution = (_b = (_a = result.solution) == null ? void 0 : _a.output.raw) == null ? void 0 : _b.replaceAll("%", '"');
  return json(JSON.parse(solution));
};

export { POST };
//# sourceMappingURL=_server.ts-2538a719.js.map
