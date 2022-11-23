<script lang="ts">
    import type Decimal from "break_infinity.js";
    import { F } from "../format";
    import { game } from "../stores";
    import Icon from "./Icon.svelte";
    import Tooltip from "./Tooltip.svelte";

    export let value: Decimal;
    export let icon: string;
    export let text = "";
    
</script>

<div class="relative flex justify-center items-center gap-1 text-2xl group">
    <Icon src={icon}/>
    <span class="font-semibold">{F(value)}</span>
    {#if text.length > 0}
        <Tooltip>{text}</Tooltip>
    {/if}
</div>