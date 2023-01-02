<script lang="ts">
    import { onDestroy, onMount, tick } from "svelte";
    import { isMobile } from "./ismobile";
    import GameTicker from "./lib/class/GameTicker";
    import GameBackground from "./lib/components/GameBackground.svelte";
    import HeaderCurrency from "./lib/components/HeaderCurrency.svelte";
    import Icon from "./lib/components/Icon.svelte";
    import MealCard from "./lib/components/MealCard.svelte";
    import MonsterCard from "./lib/components/MonsterCard.svelte";
    import TabAchievements from "./lib/components/tabs/TabAchievements.svelte";
    import TabCaloriesUpgrades from "./lib/components/tabs/TabCaloriesUpgrades.svelte";
    import TabCredits from "./lib/components/tabs/TabCredits.svelte";
    import TabEvolution from "./lib/components/tabs/TabEvolution.svelte";
    import TabGenetic from "./lib/components/tabs/TabGenetic.svelte";
    import TabSettings from "./lib/components/tabs/TabSettings.svelte";
    import Tooltip from "./lib/components/Tooltip.svelte";
    import { F } from "./lib/format";
    import { loadFromStorage, loadSettingsFromStorage, saveGame, saveSettings } from "./lib/savegame/saveload";
    import { game, settings, tabs } from "./lib/stores";

    const loaded = loadFromStorage();
    if(loaded){
        $game = loaded;
    }

    const loadedSettings = loadSettingsFromStorage();
    if(settings){
        $settings = loadedSettings;
    }

    const ticker = new GameTicker();

    onMount(() => {
        ticker.start();
        setInterval(() => {
            saveGame($game);
            saveSettings($settings);
        }, 60000);
    });
    onDestroy(() => ticker.stop());
</script>

<svelte:head>
    <title>{F($game.calories.amount)} | Evomonsters</title>
</svelte:head>

<header class="sticky top-0 z-20 bg-black bg-opacity-70 text-slate-50 shadow-md p-4 flex justify-evenly items-center">
    <h1 class="hidden md:block">Evomonsters</h1>

    <HeaderCurrency icon="./images/resources/calories.png" 
        currency={$game.calories} 
        text="Calories"/>

    {#if $game.genetic.total.gte(1)}
        <HeaderCurrency icon="./images/resources/genetic.png" 
            currency={$game.genetic} 
            text="Genetic Points (GP)"/>
    {/if}
</header>
<main class="p-4 pb-16">
    <GameBackground/>
    <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 lg:gap-8">
        <div class="flex justify-center">
            <MonsterCard monster={$game.monster}/>
        </div>
        <div class="flex justify-center">
            <MealCard mealContent={$game.meal}/>
        </div>
        <div class="flex justify-center items-center flex-wrap gap-4">
            <button on:click={() => $tabs.caloriesTab = TabCaloriesUpgrades}>Upgrades</button>
            <button on:click={() => $tabs.caloriesTab = TabAchievements}>Achievements</button>
            <button on:click={() => $tabs.caloriesTab = TabEvolution}>Evolution</button>
            <button on:click={() => $tabs.caloriesTab = TabCredits}>Credits</button>
            {#if $game.genetic.gain.gte(1) || $game.genetic.total.gte(1)}
                <button on:click={() => $tabs.caloriesTab = TabGenetic}>Mutation</button>
            {/if}
            <button on:click={() => $tabs.caloriesTab = TabSettings}>Settings</button>
        </div>
        <div class="flex justify-center">
            <svelte:component this={$tabs.caloriesTab}/>
        </div>
    </div>
</main>