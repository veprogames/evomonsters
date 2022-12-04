<script>
    import { EVO_SENIOR } from "../../class/Monster";
    import { F } from "../../format";

    import { game } from "../../stores";

    $: nextEvolution = $game.monster.nextEvolution;

    $: senior = $game.monster.hasEvolution(EVO_SENIOR);
</script>
<div class="card-transparent flex flex-col items-center gap-2 max-w-sm">
    {#if nextEvolution}
        <p>Your next Evolution will be at  <span class="font-semibold text-green-400">{nextEvolution.score.toLocaleString("en-US")}</span> EvoScore.</p>
    {:else}
        <p class="font-semibold text-green-400">You have reached the final Evolution Stage!</p>
    {/if}
    <div class="flex justify-evenly w-full">
        <div>
            <p class="stat orange text-xl">Evoscore</p>
            <p class="text-2xl font-semibold">{$game.monster.evoMonsterScore.toNumber().toLocaleString("en-US")}</p>
        </div>
        <div>
            <p class="stat green text-xl">Damage Boost</p>
            <p class="text-2xl font-semibold">x{F($game.monster.evolutionDamageBoost, 2, 2)}</p>
        </div>
    </div>
    {#if senior}
        <p class="text-orange-400 font-semibold">
            Your Senior Monster feasts on Meals with great efficiency, reducing Meal HP and Hardness by x1.26
        </p>
    {/if}
    <p>
        You gain EvoScore depending on your overall game progress (Calories, Achievements, highest Meal).
        You can compare this score to other players.
    </p>
</div>