<script>
    import { F } from "../../format";

    import { game } from "../../stores";

    $: nextEvolution = $game.monster.nextEvolution;
</script>
<div class="card-transparent flex flex-col items-center gap-2 max-w-sm">
    <p class="stat orange text-xl">Evoscore</p>
    <p class="text-2xl font-semibold">{$game.monster.evoMonsterScore.toLocaleString("en-US")}</p>
    <p class="stat green text-xl">Damage Boost</p>
    <p class="text-2xl font-semibold">x{F($game.monster.evolutionDamageBoost, 2, 2)}</p>
    <p>
        You gain EvoScore depending on your overall game progress (Calories, Achievements, highest Meal).
        You can compare this score to other players.
    </p>
    {#if nextEvolution}
        <p>Your next Evolution will be at {nextEvolution.score} EvoScore.</p>
    {:else}
        <p class="font-semibold text-green-400">You have reached the final Evolution Stage!</p>
    {/if}
</div>