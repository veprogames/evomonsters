<script lang="ts">
    import { F } from "../../format";
    import { game } from "../../stores";
    import Icon from "../Icon.svelte";


    $: gain = $game.genetic.gain;
</script>

<div class="card-transparent flex flex-col items-center gap-2">
    <button disabled={gain.eq(0)} on:click={() => $game.genetic.mutate()}>
        Mutate and gain<br/>
        <Icon src="/images/resources/genetic.png"/> <span class="text-green-400 font-semibold">{F(gain)}</span><br/>
        (Genetic Points)
    </button>
    <p class="stat green">Damage Boost</p>
    <p class="text-xl font-semibold">x {F($game.genetic.damageBoost)}</p>
</div>