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
    const json_req = {
        topics: val,
        total_paginas: total_paginas
    }
    const solution = await fetch('api/solve', {
        method: 'POST',
        body: JSON.stringify(json_req)
    })

    return {
        solution: await solution.json(),
        names: val.map(t => t.topic)
    }
};
