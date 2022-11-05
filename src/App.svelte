<script lang="ts">
    import Meal from "./lib/class/Meal";
    import MealCard from "./lib/components/MealCard.svelte";
    import { F } from "./lib/format";
    import { game } from "./lib/stores";

    $game.currentMeal = Meal.get(0);
</script>

<header class="bg-slate-400 dark:bg-slate-700 shadow-md p-4 flex justify-evenly">
    <h1>Evomonsters</h1>
    <span>Calories: {F($game.calories.amount, 2)}</span>
</header>
<main class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
        <p>Size: {$game.monster.size}m</p>
        <div class="flex justify-center">
            <MealCard meal={$game.currentMeal}/>
        </div>
        <div>
            <p>Your highest is {F($game.calories.highest, 2)}</p>
            <p>Your total is {F($game.calories.total, 2)}</p>
        </div>
    </div>
</main>
<footer class="bg-slate-400 dark:bg-slate-700 p-4 fixed bottom-0 w-full">
    Version {$game.version}
</footer>