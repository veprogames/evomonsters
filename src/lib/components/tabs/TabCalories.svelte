<script>
    import { game, tabs } from "../../stores";
    import MealCard from "../MealCard.svelte";


    import MonsterCard from "../MonsterCard.svelte";
    import TabAchievements from "./TabAchievements.svelte";
    import TabCaloriesUpgrades from "./TabCaloriesUpgrades.svelte";
    import TabCredits from "./TabCredits.svelte";
    import TabEvolution from "./TabEvolution.svelte";
    import TabGenetic from "./TabGenetic.svelte";
    import TabSettings from "./TabSettings.svelte";

</script>

<div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 lg:gap-8">
    <div class="flex justify-center">
        <MonsterCard monster={$game.monster}/>
    </div>
    <div class="flex justify-center">
        <MealCard mealContent={$game.meal}/>
    </div>
    <div class="flex justify-center items-center flex-wrap gap-4">
        <button on:click={() => $tabs.caloriesTab = TabCaloriesUpgrades}>Upgrades</button>
        <button on:click={() => $tabs.caloriesTab = TabEvolution}>Evolution</button>
        <button on:click={() => $tabs.caloriesTab = TabCredits}>Credits</button>
        {#if $game.genetic.gain.gte(1) || $game.genetic.total.gte(1)}
            <button on:click={() => $tabs.caloriesTab = TabGenetic}>Mutation</button>
        {/if}
    </div>
    <div class="flex justify-center">
        <svelte:component this={$tabs.caloriesTab}/>
    </div>
</div>