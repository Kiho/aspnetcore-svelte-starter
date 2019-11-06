<script>
    import MenuComponent from '../navmenu/navmenu.svelte';
    import Routes from '../../routes';

    export let menu;
    export let target;

    $: target && new Routes(target);
</script>

<div class="sidebar">
    <MenuComponent bind:this={menu} />
</div>
<div class="main">
    <div class="top-row px-4">
        <a href="https://svelte.technology/" target="_blank" class="ml-md-auto">About Svelte</a>
    </div>

    <div id="app" bind:this={target} class="content px-4">
    </div>
</div>
