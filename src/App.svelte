<script lang="ts">
    import Meal from "./lib/class/Meal";
    import MealCard from "./lib/components/MealCard.svelte";
    import { F } from "./lib/format";
    import { game } from "./lib/stores";

    $game.currentMeal = Meal.get(0);
</script>

<h1 class="text-green-400 text-4xl p-8">Calories: {F($game.calories.amount, 2)}</h1>
<p>Your highest is {F($game.calories.highest, 2)}</p>
<p>Your total is {F($game.calories.total, 2)}</p>

<MealCard meal={$game.currentMeal}/>

<p>Size: {$game.monster.size}m</p>
<footer class="fixed bottom-0 w-full">
    Version {$game.version}
</footer>