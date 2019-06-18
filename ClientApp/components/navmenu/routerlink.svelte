<script>
    import { afterUpdate, createEventDispatcher } from 'svelte';
    import { basePath } from '../../config';

    const dispatch = createEventDispatcher();

    import roadtrip from "roadtrip";

    const activedClassName = "active";

    export let active = "";
    export let to = "/";
    export let location = "";
    export let item = null;

    // [svelte-upgrade warning]
    // beforeUpdate and afterUpdate handlers behave
    // differently to their v2 counterparts
    afterUpdate(() => {
        setActivedClass(location);
    });

    // [svelte-upgrade suggestion]
    // review these functions and remove unnecessary 'export' keywords
    export function navigate($e, to) {
        if ($e && $e.preventDefault) $e.preventDefault();
        // console.log('roadtrip.RouteData', roadtrip.RouteData);
        if (item) {
        dispatch("itemClick", event, item);
        } else if (to) {
            roadtrip.goto(basePath + to);
        }
    }

    export function setActivedClass(location) {
        if (location === `${basePath}${to}`) {
            active = activedClassName;
        } else {
            active = "";
        }
        // console.log("setActivedClass (location)", location, `${basePath}${to}`);
    }
</script>

<li class="nav-item px-3">
  <a class="nav-link {active}" href='{basePath}{ to }' on:click='{event => navigate(event, to)}'>
    <slot></slot>
  </a>
</li>