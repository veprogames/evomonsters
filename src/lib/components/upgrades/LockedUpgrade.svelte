<script lang="ts">
    import type Achievement from "../../class/achievements/Achievement";
    import Tooltip from "../Tooltip.svelte";
    export let achievement: Achievement;
</script>

<div class="w-20 h-20 relative group">
    <button disabled class="w-20 h-20">
        <img src="/images/placeholder.png" alt="Locked" class="w-16 h-16"/>
    </button>
    <Tooltip>
        <p class="text-red-400 font-bold">Locked</p>
        <p><span class="font-semibold">Requirement:</span> {achievement.description}</p>
    </Tooltip>
</div>