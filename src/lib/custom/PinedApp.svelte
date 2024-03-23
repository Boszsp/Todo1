<script>
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { today, getLocalTimeZone } from '@internationalized/date';
	import * as Card from '$lib/components/ui/card';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { CardContent } from '$lib/components/ui/card';
	let value = today(getLocalTimeZone());
</script>

<Card.Root class="h-[40rem]">
	<Card.Header>
		<section class="mb-2 flex items-center justify-between">
			<div>
				<Card.Title>Pined Web</Card.Title>
				<Card.Description
					>way to keep your most frequently visited websites easily accessible.</Card.Description
				>
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
			</div>
		</section>
		<Separator />
	</Card.Header>
	<CardContent class="flex flex-col h-5/6 overflow-scroll">
		<section class="flex h-auto w-full justify-center">
			<div class="flex h-auto w-11/12 flex-wrap gap-6">
				{#each new Array(62) as _, i}
					<Button class="h-20 w-20" size="icon" variant="outline">
						{i}
					</Button>
				{/each}
			</div>
		</section>
	</CardContent>
</Card.Root>
