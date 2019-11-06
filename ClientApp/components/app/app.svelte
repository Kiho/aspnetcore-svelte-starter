<script>
    import { onMount } from 'svelte';
    import MenuComponent from '../navmenu/navmenu.svelte';
    import Routes from '../../routes';

    let menu;
    let target;

    onMount(() => {
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

    <div bind:this={target} class="content px-4">
    </div>
</div>
