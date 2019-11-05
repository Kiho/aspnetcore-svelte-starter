<script>
    import { afterUpdate, createEventDispatcher } from 'svelte';
    import { basePath } from '../../config';

    const dispatch = createEventDispatcher();

    import roadtrip from 'roadtrip';

    const activedClassName = 'active';

    export let active = '';
    export let to = '/';
    export let location = '';
    export let item = null;

    $: setActivedClass(location);

    function navigate(e, to) {
        if (e && e.preventDefault) e.preventDefault();
        // console.log('roadtrip.RouteData', roadtrip.RouteData);
        if (item) {
            dispatch('itemClick', event, item);
        } else if (to) {
            roadtrip.goto(basePath + to);
        }
    }

    function setActivedClass(location) {
        if (location === `${basePath}${to}`) {
            active = activedClassName;
        } else {
            active = '';
        }
    }
</script>

<li class="nav-item px-3">
  <a class="nav-link {active}" href="{basePath}{ to }" on:click="{e => navigate(e, to)}">
    <slot></slot>
  </a>
</li>