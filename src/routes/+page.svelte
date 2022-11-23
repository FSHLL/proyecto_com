<script>
	import Topics from '../components/Topics.svelte';
	import TopicForm from '../components/TopicForm.svelte';
	import { sendTopics } from '../stores/topicStores';
	import Chart from '../components/Chart.svelte';

	$: paginas = 10;
	$: resultado = null
	$: data = null

	function handle_change(e) {
		paginas = e.target.value;
	}

	let solve = async () => {
		resultado = null
		document.getElementById("solve").classList.add('is-loading');
		document.getElementById("solve").classList.add('disabled');
		const res = await sendTopics(paginas)
		document.getElementById("solve").className = "button";
		resultado =  JSON.parse(res.solution.solutions[0]?.extraOutput.replaceAll("%", "\""))
		console.log(resultado)
		data = {
			labels: res.names,
			datasets: [
				{
					label: 'Nro de Paginas',
					data: resultado.datos,
					backgroundColor: [
						'rgba(255, 134, 159, 0.4)',
						'rgba(98,  182, 239, 0.4)',
						'rgba(255, 218, 128, 0.4)',
						'rgba(113, 205, 205, 0.4)',
						'rgba(170, 128, 252, 0.4)',
						'rgba(255, 177, 101, 0.4)',
					],
					borderWidth: 2,
					borderColor: [
						'rgba(255, 134, 159, 1)',
						'rgba(98,  182, 239, 1)',
						'rgba(255, 218, 128, 1)',
						'rgba(113, 205, 205, 1)',
						'rgba(170, 128, 252, 1)',
						'rgba(255, 177, 101, 1)',
					],
				},
			],
		};
	}

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
			<input class="input" type="number" value="10" on:change={handle_change}/>
		</p>
	</div>

	<TopicForm />

	<Topics />

	<button id="solve" class="button" on:click={solve}>Resolver</button>
	<br>
	<br>
	{#if resultado}
		<h4>Lectores potenciales: {resultado.lectores}</h4>
		<Chart data={data}/>
	{/if}
</div>
