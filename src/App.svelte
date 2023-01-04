<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import GameTicker from "./lib/class/GameTicker";
    import GameBackground from "./lib/components/GameBackground.svelte";
    import Header from "./lib/components/Header.svelte";
    import TabCalories from "./lib/components/tabs/TabCalories.svelte";
    import TabCaloriesUpgrades from "./lib/components/tabs/TabCaloriesUpgrades.svelte";
    import { F } from "./lib/format";
    import { loadFromStorage, loadSettingsFromStorage, saveGame, saveSettings } from "./lib/savegame/saveload";
    import { game, settings, tabs } from "./lib/stores";

    $tabs.tab = TabCalories;
    $tabs.caloriesTab = TabCaloriesUpgrades;

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

<Header/>
<main class="p-4 pb-16">
    <GameBackground/>
    <svelte:component this={$tabs.tab}></svelte:component>
</main>