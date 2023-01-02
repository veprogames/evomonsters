<script>
    import { game } from "../../stores";

    import CaloriesUpgradeButton from "../upgrades/CaloriesUpgradeButton.svelte";
</script>

<div class="flex flex-col items-center gap-4">
    <div class="flex justify-center gap-4 flex-wrap">
        <CaloriesUpgradeButton upgrade={$game.calories.upgrades.telekinesis} icon="./images/upgrades/telekinsesis.png"/>
        <CaloriesUpgradeButton upgrade={$game.calories.upgrades.strongTeeth} icon="./images/upgrades/teeth.png"/>
        <CaloriesUpgradeButton upgrade={$game.calories.upgrades.piercing} icon="./images/upgrades/piercing.png"/>
    </div>
    {#if $game.calories.unlockedMaxAll}
        <button on:click={() => $game.calories.maxAll()}>Max All</button>
    {/if}
</div>