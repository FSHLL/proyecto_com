<script>
	import Topics from '../components/Topics.svelte';
	import TopicForm from '../components/TopicForm.svelte';
	import { sendTopics } from '../stores/topicStores';
</script>

<div class="container">
	<div class="columns">
		<div class="column is-four-fifths">
			<h1 class="title">Problema del Períodico</h1>
		</div>
		<div class="column">
			<h2>Estefania Rojas</h2>
			<h2>Duvan Hernandez</h2>
			<h2>Freder Hernandez</h2>
		</div>
	</div>

	<div class="field has-addons has-addons-centered">
		<p class="control button is-static">
            <strong>Total páginas</strong>
		</p>
		<p class="control">
			<input class="input" type="number" value="10" />
		</p>
	</div>

	<TopicForm />

	<Topics />

	<button class="button" on:click={sendTopics}>Send</button>
</div>
