<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import Button from '$lib/components/ui/button/button.svelte';
	import { Badge } from "$lib/components/ui/badge/index.js";
	import * as Card from '$lib/components/ui/card';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import TodoCard from '$lib/custom/TodoCard.svelte';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import AddDialog from '$lib/custom/AddDialog.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import LoadTodoCard from '$lib/custom/LoadTodoCard.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import LocalTimeCalender from '$lib/custom/LocalTimeCalender.svelte';
	import PinedApp from '$lib/custom/PinedApp.svelte';
	import { setTodo,delTodo,logout } from '$lib/firebase/db.js';
	import { toast } from 'svelte-sonner';

	const itemsW = data.itemsH;

	const flipDurationMs = 300;
	function handleDndConsider(e) {
		itemsW.set(e.detail.items);
	}
	function handleDndFinalize(e) {
		setTodo(e.detail.items)
	}
	
</script>


<main class="flex h-full justify-center">
	<section class="w-10/12 xl:w-8/12 2xl:w-6/12">
		<h2 class="mt-4 text-2xl font-bold">Todo List Section</h2>
		<p class="text-sm text-muted-foreground">
			organize your tasks within a larger to-do list. It's like creating folders within a filing
			cabinet for your to-dos.
		</p>
		
		<Button on:click={logout} variant="link" class="m-0  p-0 mb-6 text-xs text-muted-foreground font-thin" >Logout</Button>
		<Carousel.Root>
			<Carousel.Content>
				<Carousel.Item>
					<Card.Root class="h-[40rem]">
						<Card.Header>
							<section class="mb-2 flex items-center justify-between">
								<div>
									<Card.Title>All Todo List</Card.Title>
									<Card.Description>
										a list of things you have to-do.
										<Badge variant="outline">You have { $itemsW.filter(v=>!v.checked).length} tasks todo.</Badge>
									</Card.Description>
								</div>
								<div class="flex items-center gap-2">
									<Button on:click={toggleMode} variant="outline" size="icon">
										<Sun
											class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
										/>
										<Moon
											class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
										/>
										<span class="sr-only">Toggle theme</span>
									</Button>
									<AddDialog setTodo={(t)=>{setTodo([...t])}} tasks={itemsW} />
								</div>
							</section>
							<Separator />
						</Card.Header>
						<CardContent class="h-5/6 overflow-scroll">
							{#if $itemsW.length > 0}
								<div
									class="flex h-auto min-h-full flex-col gap-4"
									use:dndzone={{ items: $itemsW, flipDurationMs, dropTargetStyle: {} }}
									on:consider={handleDndConsider}
									on:finalize={handleDndFinalize}
								>
									{#each $itemsW as item, index (item.id)}
										<div
											class={!item.checked ? '' : 'hidden transition-all'}
											animate:flip={{ duration: flipDurationMs }}
										>
											{#if !item.checked}
												<div transition:blur={{ duration: flipDurationMs }}>
													<TodoCard delTask={()=>{
														try{
															delTodo($itemsW)
															toast.success("task \""+item.name+"\" complete")
														}
														catch(e){
															toast.error("complete task failed")
														}
													}} bind:checked={item.checked} title={item.name} />
												</div>
											{/if}
										</div>
									{/each}
								</div>
							{:else if $itemsW.length==0}
							<p class="text-center">No todo here</p>
							{:else}
								<div class="flex h-full flex-col gap-4">
									{#each new Array(5) as i}
										<LoadTodoCard />
									{/each}
								</div>
							{/if}
						</CardContent>
					</Card.Root>
				</Carousel.Item>

				<Carousel.Item>
					<LocalTimeCalender />
				</Carousel.Item>

				<Carousel.Item>
					<PinedApp />
				</Carousel.Item>
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</section>
</main>
