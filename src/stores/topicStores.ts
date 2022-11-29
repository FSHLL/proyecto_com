import type { Topic } from '$lib/types/Topic';
import { writable } from 'svelte/store';

export const topics = writable<Topic[]>([]);

export const addTopic = async (topic: Topic) => {
	topics.update((tops) => [...tops, topic]);
};

export const deleteTopic = async (index: number) => {
	topics.update((tops) => { 
        tops.splice(index, 1);
        return tops;
    });
};

export const sendTopics = async (total_paginas=10) => {
    let val:Topic[] = []
    topics.subscribe($ => val = $)()

    const min_pages:any[] = []
    const max_pages:any[] = []
    const lectors:any[] = []

    val.map((topic:Topic) => {
        min_pages.push(topic.minPages)
        max_pages.push(topic.maxPages)
        lectors.push(topic.numPotentialReaders)
    })
    const n:int = val.length

    const solution = await fetch('https://back-minizinc.herokuapp.com/solve', {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            n: n,
            paginas: total_paginas,
            pag_min: min_pages,
            pag_max: max_pages,
            lectores: lectors
        })
    })
    return {
        solution: await solution.json(),
        names: val.map(t => t.topic)
    }
};
