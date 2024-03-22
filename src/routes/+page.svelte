<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import TodoCard from '$lib/custom/TodoCard.svelte';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	let items = [
		{ id: 1, name: 'item1' ,checked:true},
		{ id: 2, name: 'item2' ,checked:true},
		{ id: 3, name: 'item3' ,checked:true},
		{ id: 4, name: 'item4' ,checked:true}
	];
	const flipDurationMs = 300;
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>

<svelte:head>
	<title>Todo</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main class="flex justify-center">
	<section class="w-10/12 xl:w-8/12 2xl:w-6/12">
		<h2 class="mb-6 mt-4 text-2xl font-bold">Todo List Section</h2>
		<Card.Root>
			<Card.Header>
				<Card.Title>TODO List</Card.Title>
				<Card.Description>a list of things you have to-do.</Card.Description>
			</Card.Header>
			<CardContent class="min-h-96">
				<div
					class="flex flex-col gap-4"
					use:dndzone={{ items, flipDurationMs,dropTargetStyle:{}}}
					on:consider={handleDndConsider}
					on:finalize={handleDndFinalize}
				>
					{#each items as item, index (item.id)}
						<div class={item.checked ? "" : "hidden"} animate:flip={{ duration: flipDurationMs }}>
							{#if item.checked}
								<div transition:blur>
									<TodoCard bind:checked={item.checked} title={item.name} />
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</CardContent>
		</Card.Root>
	</section>
</main>
