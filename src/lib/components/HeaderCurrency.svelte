<script lang="ts">
    import type Decimal from "break_eternity.js";
    import type GameResource from "../class/GameResource";
    import { F } from "../format";
    import { game } from "../stores";
    import Icon from "./Icon.svelte";
    import Tooltip from "./Tooltip.svelte";

    export let currency: GameResource;
    export let icon: string;
    export let text = "";

    $: value = currency.amount;
    
</script>

<div class="relative group">
    <div class="text-2xl flex justify-center items-center gap-1">
        <Icon src={icon}/>
        <span class="font-semibold">{F(value)}</span>
    </div>
    {#if text.length > 0}
        <Tooltip>
            <span class="font-semibold text-blue-400">{text}</span>
            <div class="flex flex-col">
                <p><span class="stat green">Total</span> <span>{F(currency.totalThisRun, 2, 0)}</span></p>
                <p><span class="stat green">Highest</span> <span>{F(currency.highest, 2, 0)}</span></p>
            </div>
        </Tooltip>
    {/if}
</div>