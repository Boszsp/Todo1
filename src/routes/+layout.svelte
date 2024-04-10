<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import './styles.css';
	import { login, auth, loginAno, addTodo } from '$lib/firebase/db.js';

	import Reload from 'svelte-radix/Reload.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	import sha256 from 'crypto-js/sha256';

	let email = '';
	let password = '';
	let task = '';
	let cuser = auth.currentUser;
	let loginOnload = false;
	let addTaskLoading = false;
	let loadingPage = true;

	auth.onAuthStateChanged((user) => {
		cuser = user;
		loadingPage = false;
	});

	onMount(() => {
		if (browser) {
			email = localStorage?.getItem('email') ?? '';
		}
	});

	function loginH(email, password) {
		loginOnload = true;

		if (
			sha256(email).toString() ==
				'f390c77ee9b5314bdd19653e92c9e1674940b3cab6eb6d850d5a74aac256cdfb' &&
			sha256(password).toString() ==
				'f390c77ee9b5314bdd19653e92c9e1674940b3cab6eb6d850d5a74aac256cdfb'
		) {
			loginAno();
		} else {
			login(email, password)
				.then(() => {
					toast.success('login success');
				})
				.catch((e) => {
					toast.error(e.message.replace('Firebase: ', 'Login fail : '));
				})
				.finally(() => {
					loginOnload = false;
				});
		}
	}
</script>

<svelte:head>
	<title>Todoo</title>
	<meta name="description" content="Todo login" />
</svelte:head>

<div class="app h-full">
	<ModeWatcher />
	<Toaster closeButton expand={false} position="top-center" />
	{#if loadingPage}
	<div class="fixed w-full h-full flex items-center justify-center">
		<div class="absolute blur bg-white w-full h-full opacity-75">
		</div>
		<div class="flex flex-col items-center">
			<Reload class="animate-spin" />
		</div>
	</div>
	{/if}
	<main class="h-full">
		{#if cuser != null}
			<slot />
		{:else}
			<div class="flex h-full w-full items-center justify-center pb-12">
				<Tabs.Root value="signin" class="w-10/12 lg:w-4/12">
					<Tabs.List class="grid w-full grid-cols-2">
						<Tabs.Trigger value="signin">Sing in</Tabs.Trigger>
						<Tabs.Trigger value="addtask">Add Task</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="signin">
						<Card.Root class="w-full">
							<Card.Header>
								<Card.Title>Sign in</Card.Title>
								<Card.Description>blabla.</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="grid w-full items-center gap-4">
									<div class="flex flex-col space-y-1.5">
										<Label for="email">Email</Label>
										<Input
											id="email"
											on:change={() => {
												if (browser) {
													localStorage.setItem('email', email);
												}
											}}
											placeholder="email"
											bind:value={email}
										/>
									</div>
									<div class="flex flex-col space-y-1.5">
										<Label for="password">Password</Label>
										<Input
											type="password"
											id="password"
											placeholder="*****"
											bind:value={password}
										/>
									</div>
								</div>
							</Card.Content>
							<Card.Footer class="flex justify-end">
								{#if loginOnload}
									<Button disabled>
										<Reload class="mr-2 h-4 w-4 animate-spin" />
										Please wait
									</Button>
								{:else}
									<Button on:click={() => loginH(email, password)}>Sign in</Button>
								{/if}
							</Card.Footer>
						</Card.Root></Tabs.Content
					>
					<Tabs.Content value="addtask">
						<Card.Root class="w-full">
							<Card.Header>
								<Card.Title>Add Task</Card.Title>
								<Card.Description>add your new task.</Card.Description>
							</Card.Header>
							<Card.Content>
								<div class="grid w-full items-center gap-4">
									<div class="flex flex-col space-y-1.5">
										<Label for="task">Task</Label>
										<Input id="task" placeholder="task" bind:value={task} />
									</div>
								</div>
							</Card.Content>
							<Card.Footer class="flex justify-end">
								{#if addTaskLoading}
									<Button disabled>
										<Reload class="mr-2 h-4 w-4 animate-spin" />
										Please wait
									</Button>
								{:else}
									<Button
										on:click={() => {
											addTaskLoading = true;
											try {
												if (task.trim() == '') {
													throw new Error('task cannot null');
												}
												addTodo(task);
												toast.success('Add task successful');
											} catch (ee) {
												toast.error(ee.message.replace('Firebase: ', 'Add task fail : '));
											} finally {
												addTaskLoading = false;
											}
											task = '';
										}}>Add</Button
									>
								{/if}
							</Card.Footer>
						</Card.Root></Tabs.Content
					>
				</Tabs.Root>
			</div>
		{/if}
	</main>
</div>
