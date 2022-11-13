<script lang="ts">
    import { text } from "svelte/internal";
    import type CaloriesUpgrade from "../../class/upgrades/CaloriesUpgrade";
    import UpgradeButton from "./UpgradeButton.svelte";

    export let upgrade: CaloriesUpgrade;
    export let icon = "/images/placeholder.png";

    $: isUnlocked = upgrade.isUnlocked;
</script>

<UpgradeButton {upgrade} {icon} currencyIcon="/images/placeholder.png">
    <span slot="title" class:text-red-400={!isUnlocked} class="text-blue-400 font-semibold">
        {#if isUnlocked}
            {upgrade.title}
        {:else}
            Locked
        {/if}
    </span>
    <span slot="description">
        {#if isUnlocked}
            {upgrade.description}
        {:else}
            Requirement: {upgrade.requiredAchievement.description}
        {/if}
    </span>
</UpgradeButton>