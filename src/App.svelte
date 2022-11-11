<script lang="ts">
    import Meal from "./lib/class/Meal";
    import MealCard from "./lib/components/MealCard.svelte";
    import MonsterCard from "./lib/components/MonsterCard.svelte";
    import { F } from "./lib/format";
    import { game } from "./lib/stores";

    $game.meal.current = Meal.get(0);
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
            
        </div>
        <div class="flex justify-evenly items-center">
            <button>A</button>
            <button>B</button>
            <button>C</button>
            <div>
                {#if $game.myUpgrade.isUnlocked}
                    {$game.myUpgrade.title}<br/>
                    {$game.myUpgrade.description}<br/>
                    {$game.myUpgrade.priceDisplay}<br/>
                    {$game.myUpgrade.effectDisplay}<br/>
                    <button on:click={() => $game.myUpgrade.buy()}>Buy</button>
                {:else}
                    Upgrade locked!
                {/if}
            </div>
        </div>
    </div>
</main>
<footer class="bg-slate-400 dark:bg-slate-700 p-4 fixed bottom-0 w-full">
    Version {$game.version}
</footer>