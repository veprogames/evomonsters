<script lang="ts">
    import { onDestroy, onMount, tick } from "svelte";
    import GameTicker from "./lib/class/GameTicker";
    import MealCard from "./lib/components/MealCard.svelte";
    import MonsterCard from "./lib/components/MonsterCard.svelte";
    import TabAchievements from "./lib/components/tabs/TabAchievements.svelte";
    import TabCaloriesUpgrades from "./lib/components/tabs/TabCaloriesUpgrades.svelte";
    import { F } from "./lib/format";
    import { loadFromStorage, saveGame } from "./lib/savegame/saveload";
    import { game, tabs } from "./lib/stores";

    const loaded = loadFromStorage();
    if(loaded){
        console.log("Loaded and revived from localStorage:", loaded);
        $game = loaded;
    }

    const ticker = new GameTicker();

    onMount(() => {
        ticker.start();
    });
    onDestroy(() => ticker.stop());
</script>

<header class="bg-slate-400 dark:bg-slate-700 shadow-md p-4 flex justify-evenly items-center">
    <h1>Evomonsters</h1>
    <span>Calories: {F($game.calories.amount, 2)}</span>
</header>
<main class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
        <div class="flex justify-center">
            <MonsterCard monster={$game.monster}/>
        </div>
        <div class="flex justify-center">
            <MealCard mealContent={$game.meal}/>
        </div>
        <div class="flex justify-center">
            <svelte:component this={$tabs.caloriesTab}/>
        </div>
        <div class="flex justify-evenly items-center">
            <button on:click={() => $tabs.caloriesTab = TabCaloriesUpgrades}>Upgrades</button>
            <button on:click={() => $tabs.caloriesTab = TabAchievements}>Achievements</button>
            <button on:click={() => saveGame($game)}>Save Game</button>
        </div>
    </div>
</main>
<footer class="bg-slate-400 dark:bg-slate-700 p-4 fixed bottom-0 w-full">
    Version {$game.version}
</footer>