<script lang="ts">
    import type Achievement from "../../class/achievements/Achievement";
    import type { MonsterEvolution } from "../../class/Monster";
    import Tooltip from "../Tooltip.svelte";
    export let evolution: MonsterEvolution;
</script>

<div class="w-20 h-20 relative group">
    <button disabled class="w-20 h-20">
        <img src="./images/locked.png" alt="Locked" class="w-16 h-16"/>
    </button>
    <Tooltip>
        <p class="text-red-400 font-bold">Locked</p>
        <p>
            <span class="font-semibold">Required EvoScore:</span>
            <span class="text-green-400 font-semibold">{evolution.score.toLocaleString("en-US")}</span>
        </p>
    </Tooltip>
</div>