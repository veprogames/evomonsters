<script lang="ts">
    import type ContentMeal from "../class/ContentMeal";
    import type Meal from "../class/Meal";
    import { F } from "../format";
    import { game } from "../stores";

    export let mealContent: ContentMeal;
    $: meal = mealContent.current;

    function damage(){
        meal.bite($game.monster);
    }

    function previous(){
        mealContent.previous();
    }

    function next(){
        mealContent.next();
    }
</script>

<div class="card flex flex-col items-center w-fit gap-1">
    <div class="flex justify-between items-center gap-2">
        <button class:invisible={mealContent.currentlyAtFirst} on:click={previous}>&lt;</button>
        <img src="/images/placeholder.png" alt={meal.name} 
            class="w-24 h-24 hover:brightness-90 active:brightness-75 transition"
            on:click={damage} on:keydown={damage}/>
        <button class:invisible={mealContent.currentlyAtHighest} on:click={next}>&gt;</button>
    </div>
    <p class="font-semibold">{meal.name}</p>
    <p>HP {F(meal.currentHp)}</p>
    <p>Hardness {F(meal.hardness)}</p>
    <p>Calories {F(meal.calories)}</p>
</div>