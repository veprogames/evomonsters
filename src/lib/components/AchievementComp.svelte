<script lang="ts">
    import type Achievement from "../class/achievements/Achievement";
    import Tooltip from "./Tooltip.svelte";

    export let achievement: Achievement;
    export let icon = "./images/placeholder.png";
</script>

<div class="relative inline-flex justify-center items-center
    w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-md group"
    class:unlocked={achievement.unlocked}>
    <img src={icon} alt="Achievement Icon" class="w-16 h-16 rounded-md"/>
    <Tooltip>
        <p class="text-blue-400 font-bold">{achievement.title}</p>
        <p>{achievement.description}</p>
        {#if achievement.unlocked}
            <p class="text-green-400 font-bold">Unlocked!</p>
        {/if}
    </Tooltip>
</div>

<style lang="postcss">
    div.unlocked{
        @apply bg-slate-500;
    }
</style>