<script>
    import { onMount } from 'svelte';
    import MenuComponent from '../navmenu/navmenu.svelte';
    import Routes from '../../routes';

    export let menu;

    onMount(() => {
        const target = document.querySelector('#app');
        new Routes(target);
        // console.log('router', router);
    });
</script>

<div class="sidebar">
    <MenuComponent bind:this={menu} />
</div>
<div class="main">
    <div class="top-row px-4">
        <a href="https://svelte.technology/" target="_blank" class="ml-md-auto">About Svelte</a>
    </div>

    <div id="app" class="content px-4">
    </div>
</div>
