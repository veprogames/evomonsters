<script lang="ts">
    import { F } from "../../format";
    import { game } from "../../stores";
    import Icon from "../Icon.svelte";


    $: gain = $game.genetic.gain;
</script>

<div class="card-transparent flex flex-col items-center gap-1 h-fit">
    <button disabled={gain.eq(0)} on:dblclick={() => $game.genetic.mutate()}>
        <span class="text-blue-400 font-semibold">Double Click</span> to Mutate and gain<br/>
        <Icon src="/images/resources/genetic.png"/> <span class="text-green-400 font-semibold">{F(gain)}</span><br/>
        (Genetic Points)<br/>
        <span class="text-green-400 font-semibold">+100%</span> Damage each
    </button>
    <p class="stat green">Damage Boost</p>
    <p class="text-xl font-semibold">x {F($game.genetic.damageBoost)}</p>
</div>