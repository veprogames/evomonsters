<script lang="ts">
    import type Upgrade from "../../class/upgrades/Upgrade";
    import Tooltip from "../Tooltip.svelte";

    export let upgrade: Upgrade;
    export let icon: string = "/images/placeholder.png";
    export let currencyIcon: string = "/images/placeholder.png";
</script>

<button disabled={!upgrade.canAfford} on:click={() => upgrade.buy()}
    class="hidden lg:inline-flex justify-center items-start relative w-20 h-20 group">
    <img src={icon} alt="Icon" class="w-3/4 h-3/4"/>
    <span class="absolute -translate-x-1/2 left-1/2 bottom-0.5">
        {#if upgrade.isMaxed}
            Max
        {:else if upgrade.maxLevel < Infinity}
            {upgrade.level}/{upgrade.maxLevel}
        {:else}
            {upgrade.level}
        {/if}
    </span>
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
    </Tooltip>
</button>