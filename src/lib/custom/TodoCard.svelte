<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
    import { toast } from "svelte-sonner";

	export let title = '';
	export let checked = false;
    let cid = title+Math.floor(Math.random()*100)

    const copyToCliboard = ()=>{
        navigator.clipboard.writeText(title).then(
            ()=>{
                toast.success("Copy \""+title+"\" to clipboard success")

            }
        ).catch(
            ()=>{
                toast.error("Cannot copy \""+title+"\" to clipboard success")

            }
        )
    }
</script>

<Card>
	<div class="m-2 mx-4 flex items-center gap-2">
		<Checkbox bind:checked id={cid}></Checkbox>
		<Label class="text-md w-full">{title}</Label>
		<Button on:click={copyToCliboard} class="self-end" variant="outline">Copy</Button>
    </div>
</Card>
