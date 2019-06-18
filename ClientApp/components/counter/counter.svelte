<script>
    export let count = 0;
</script>

<div>
    <h1>Counter</h1>

    <p>This is a simple example of a Svelte.js component.</p>

    <p>Current count: <strong>{ count }</strong></p>
    <button class="btn btn-primary" on:click="{() => count += 1}">Increment</button>
</div>
