<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { toast } from 'svelte-sonner';

	export let title = '';
	export let checked = false;
	export let delTask = () => {};
	let cid = title + Math.floor(Math.random() * 100);

	$: if (checked) {
		delTask();
	}

	const copyToCliboard = () => {
		navigator.clipboard
			.writeText(title)
			.then(() => {
				toast.success('Copy "' + title + '" to clipboard success');
			})
			.catch(() => {
				toast.error('Cannot copy "' + title + '" to clipboard success');
			});
	};
</script>

<Card class="w-full overflow-hidden">
	<div class="p-2 px-4 flex w-full items-center justify-between gap-2">
		<div class="flex items-center gap-2 w-full">
			<Checkbox bind:checked id={cid}></Checkbox>
			<p class="text-sm truncate">
				{title}</p
			>
		</div>
		<Button on:click={copyToCliboard} variant="outline">Copy</Button>
	</div>
</Card>
