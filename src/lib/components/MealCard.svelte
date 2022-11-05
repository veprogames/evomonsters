<script lang="ts">
    import type Meal from "../class/Meal";
    import { F } from "../format";
    import { game } from "../stores";

    export let meal: Meal;

    function damage(){
        meal.damage($game.monster.damage);
    }
</script>

<div on:click={damage} on:keydown={damage} class="card flex flex-col items-center w-fit">
    <p class="font-semibold">{meal.name}</p>
    <p>HP {F(meal.currentHp)}</p>
    <p>Hardness {F(meal.hardness)}</p>
    <p>Calories {F(meal.calories)}</p>
</div>