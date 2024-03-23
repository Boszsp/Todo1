<script>
	import * as Dialog from '$lib/components/ui/dialog';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import { CirclePlus } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { toast } from 'svelte-sonner';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	let open = false;
	let taskVal = '';

	export let addHandler = (newTask) => {};
	let submitHandler = (e) => {
		open = false;
		try {
			addHandler(taskVal);
			toast.success('Add task success');
			toast.warning('this function not avalible now');
		} catch {
			toast.error('Add task fail');
			toast.warning('this function not avalible now');
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ size: 'icon' })}>
		<CirclePlus class="h-[1.2rem] w-[1.2rem]" />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add new todo task</Dialog.Title>
			<Dialog.Description>
				an instruction to include a new item on your to-do list. It basically means "write down
				something new that needs to be done.
			</Dialog.Description>
			<div class="flex flex-col gap-4 pt-4">
				<div class="flex flex-col gap-2">
					<Label>Task</Label>
					<Input bind:value={taskVal} placeHolder="new task" />
				</div>
				<Dialog.Footer>
					<Button on:click={submitHandler}>Add</Button>
				</Dialog.Footer>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
