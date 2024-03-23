<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from "mode-watcher";
	import '../app.pcss';
	import './styles.css';
</script>

<div class="app h-full">
	<ModeWatcher/>
	<Toaster closeButton  expand={false} position="top-center"/>
	<main class="h-full">
		<slot />
	</main>
</div>
