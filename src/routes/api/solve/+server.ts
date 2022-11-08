import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import EmbeddedMiniZinc from 'minizinc/build/EmbeddedMiniZinc';
import type { Topic } from '$lib/types/Topic';

export const POST: RequestHandler = async ({ request }) => {

    const m = new EmbeddedMiniZinc();
 
    const model = `% Baking cakes for the school fete

    var 0..100: b; % no. of banana cakes
    var 0..100: c; % no. of chocolate cakes
    
    % flour
    constraint 250*b + 200*c <= 4000;
    % bananas
    constraint 2*b  <= 6;
    % sugar
    constraint 75*b + 150*c <= 2000;
    % butter
    constraint 100*b + 150*c <= 500;
    % cocoa
    constraint 75*c <= 500;
    
    % maximize our profit
    solve maximize 400*b + 450*c;`;
    
    const result = await m.solve(model);
    console.log(result);

	const data = await request.json();

	return json(data);
};

export const GET: RequestHandler = ({ url }) => {
    let data = 'n=';
    const totalPages = Number(url.searchParams.get('totalPages') ?? '0');
    const topics:Topic[] = JSON.parse(url.searchParams.get('topics') ?? '');
    
    data += totalPages + '\n \n';
    
    topics.forEach(topic => {
        data += `topic=${topic.topic}\n`;
        data += `minPages=${topic.minPages}\n`;
        data += `maxPages=${topic.maxPages}\n`;
        data += `numPotentialReaders=${topic.numPotentialReaders}\n \n`;
    });

    if (!totalPages || !topics) {
        throw error(400, 'Topics or total pages undefined');
    }
   
    return new Response(data)
};
