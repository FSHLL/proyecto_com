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

export const sendTopics = async () => {
    let val
    topics.subscribe($ => val = $)()
  
    const data = await fetch('api/solve', {
        method: 'POST',
        body: JSON.stringify(val)
    })

};
