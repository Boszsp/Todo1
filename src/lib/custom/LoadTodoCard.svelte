<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
</script>

<Card>
	<div class="m-2 mx-4 flex items-center gap-2">
		<Checkbox disabled > </Checkbox>
		<Label class="text-md w-full"><Skeleton class="w-full h-4"></Skeleton></Label>
		<Button class="self-end" variant="outline"><Skeleton class="w-8 h-6"></Skeleton></Button>
    </div>
</Card>
