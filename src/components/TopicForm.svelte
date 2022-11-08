<script lang="ts">
	import { addTopic } from '../stores/topicStores';

	let topic: Topic = { topic: null, minPages: null, maxPages: null, numPotentialReaders: null };

	const save = () => {
		addTopic(topic);
		topic = { topic: null, minPages: null, maxPages: null, numPotentialReaders: null };
	};
</script>

<form on:submit|preventDefault={save}>
	<div class="field is-grouped is-grouped-multiline is-fullwidth">
		<p class="control">
			<input 
				bind:value={topic.topic}
				class="input" 
				type="text" 
				placeholder="Tema"
				required
			/>
		</p>
		<p class="control">
			<input
				bind:value={topic.minPages}
				class="input"
				type="number"
				placeholder="Mínimo de lectores"
				required
			/>
		</p>
		<p class="control">
			<input
				bind:value={topic.maxPages}
				class="input"
				type="number"
				placeholder="Maximo de lectores"
				required
			/>
		</p>
		<p class="control">
			<input
				bind:value={topic.numPotentialReaders}
				class="input"
				type="number"
				placeholder="Num Potenciales Lectores"
				required
			/>
		</p>
		<p class="control">
			<button class="button is-dark">Agregar</button>
		</p>
	</div>
</form>
