<script>
	import { deleteTopic, topics } from '../stores/topicStores';
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Tema</th>
			<th>Mín páginas</th>
			<th>Max páginas</th>
			<th>Num potenciales lectores</th>
		</tr>
	</thead>
	<tbody>
		{#each $topics as topic, i}
			<tr>
				<td>{topic.topic}</td>
				<td>{topic.minPages}</td>
				<td>{topic.maxPages}</td>
				<td>{topic.numPotentialReaders}</td>
				<td>
					<button class="button is-danger" on:click={() => deleteTopic(i)}>X</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
