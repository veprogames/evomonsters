<script>
    import { game, tabs } from "../stores";

    import HeaderCurrency from "./HeaderCurrency.svelte";
    import TabAchievements from "./tabs/TabAchievements.svelte";
    import TabCalories from "./tabs/TabCalories.svelte";
    import TabSettings from "./tabs/TabSettings.svelte";
</script>

<header class="sticky top-0 z-20 bg-black bg-opacity-70 text-slate-50 shadow-md p-4 flex flex-col justify-evenly items-center">
    <div class="w-full flex justify-evenly items-center">
        <HeaderCurrency icon="./images/resources/calories.png" 
            currency={$game.calories} 
            text="Calories"/>

        {#if $game.genetic.total.gte(1)}
            <HeaderCurrency icon="./images/resources/genetic.png" 
                currency={$game.genetic} 
                text="Genetic Points (GP)"/>
        {/if}
    </div>
    <nav class="flex justify-center space-x-4 flex-wrap">
        <button on:click={() => $tabs.tab = TabCalories}>Main</button>
        <button on:click={() => $tabs.tab = TabSettings}>Settings</button>
        <button on:click={() => $tabs.tab = TabAchievements}>Achievements</button>
    </nav>
</header>