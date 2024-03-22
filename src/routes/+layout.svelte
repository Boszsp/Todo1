<script>
	import { Toaster } from '$lib/components/ui/sonner';
import '../app.pcss';
	import './styles.css';
</script>

<div class="app">
	<Toaster closeButton  expand={false} position="top-center"/>
	<main>
		<slot />
	</main>
</div>
