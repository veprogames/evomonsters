<script lang="ts">
    import type ContentMeal from "../class/content/ContentMeal";
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

<div class="card-transparent flex flex-col items-center w-fit gap-1">
    <div class="flex justify-between items-center gap-4">
        <button class:invisible={mealContent.currentlyAtFirst} on:click={previous}>&lt;</button>
        <img src={meal.iconPath} alt={meal.name} 
            class="w-24 h-24 lg:w-36 lg:h-36 rounded-full hover:brightness-90 active:brightness-75 transition"
            draggable="false"
            on:click={damage} on:keydown={damage}/>
        <button class:invisible={mealContent.currentlyAtHighest} on:click={next}>&gt;</button>
    </div>
    <p class="font-semibold">{meal.name}</p>
    <p><span class="stat orange">HP</span> {F(meal.currentHp)}</p>
    <p><span class="stat blue">Hardness</span> {F(meal.hardness)}</p>
    <p><span class="stat green">Calories</span> {F(meal.calories)}</p>
</div>

<style lang="postcss">
    button{
        @apply text-4xl px-4;
    }
</style>