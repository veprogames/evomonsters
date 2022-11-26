<script lang="ts">
    import { isMobile } from "../../../ismobile";
    import type Upgrade from "../../class/upgrades/Upgrade";
    import Tooltip from "../Tooltip.svelte";

    export let upgrade: Upgrade;
    export let icon: string = "/images/placeholder.png";
    export let currencyIcon: string = "/images/placeholder.png";

    $: mobile = isMobile();

    function buy(){
        if(!mobile){
            upgrade.buy();
        }
    }

    function buyMobile(){
        if(mobile){
            upgrade.buy();
        }
    }
</script>

<div class="relative group w-20 h-20">
    <button disabled={!upgrade.canAfford}
        on:click={buy}
        on:dblclick={buyMobile}
        class="inline-flex justify-center items-start relative w-20 h-20"
        class:error={!upgrade.canAfford}>
        <img src={icon} alt="Icon" class="w-12 h-12 rounded-md"/>
        <span class="absolute -translate-x-1/2 left-1/2 bottom-0">
            {#if upgrade.isMaxed}
                Max
            {:else if upgrade.maxLevel < Infinity}
                {upgrade.level}/{upgrade.maxLevel}
            {:else}
                {upgrade.level}
            {/if}
        </span>
    </button>
    <Tooltip>
        <slot name="title">
            <span class="text-blue-400 font-semibold">{upgrade.title}</span>
        </slot>
        <slot name="description">
            <p>{upgrade.description}</p>
        </slot>
        <slot name="effect">
            <p>{upgrade.effectDisplay}</p>
        </slot>
        <slot name="price">
            <p class:text-red-400={!upgrade.canAfford} class="flex items-center gap-1">
                <img src={currencyIcon} alt="Currency Icon" class="h-6 w-auto inline"/> {upgrade.priceDisplay}
            </p>
        </slot>
        {#if mobile}
            <span class="text-blue-400">Double Click to buy</span>
        {/if}
    </Tooltip>
</div>