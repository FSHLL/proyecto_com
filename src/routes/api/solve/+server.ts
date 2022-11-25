import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as MiniZinc from 'minizinc';
import type { Topic } from '$lib/types/Topic';

export const POST: RequestHandler = async ({ request }) => {

    const m = new MiniZinc.Model();
    const topics:string[] = []
    const min_pages:any[] = []
    const max_pages:any[] = []
    const lectors:any[] = []
    const body = await request.json()
    body.topics.map((topic:Topic) => {
        topics.push(topic.topic)
        min_pages.push(topic.minPages)
        max_pages.push(topic.maxPages)
        lectors.push(topic.numPotentialReaders)
    })

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
    `

    m.addString(model);
    m.addDznString(data);

    const result = await m.solve({
        options: {
          solver: 'Chuffed',
          'all-solutions': true
        }
      });

    const solution = result.solution?.output.raw?.replaceAll("%", "\"")

	return json(JSON.parse(solution));
};
