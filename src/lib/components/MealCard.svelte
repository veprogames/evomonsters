<script lang="ts">
    import type Meal from "../class/Meal";
    import { F } from "../format";
    import { game } from "../stores";

    export let meal: Meal;

    function damage(){
        meal.bite($game.monster);
    }
</script>

<div class="card flex flex-col items-center w-fit">
    <div class="flex justify-between items-center gap-2">
        <button>&lt;</button>
        <img src="/images/placeholder.png" alt={meal.name} 
            class="w-24 h-24 hover:brightness-90 active:brightness-75 transition"
            on:click={damage} on:keydown={damage}/>
        <button>&gt;</button>
    </div>
    <p class="font-semibold">{meal.name}</p>
    <p>HP {F(meal.currentHp)}</p>
    <p>Hardness {F(meal.hardness)}</p>
    <p>Calories {F(meal.calories)}</p>
</div>