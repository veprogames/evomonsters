<script lang="ts">
    import { text } from "svelte/internal";
    import type CaloriesUpgrade from "../../class/upgrades/CaloriesUpgrade";
    import LockedUpgrade from "./LockedUpgrade.svelte";
    import UpgradeButton from "./UpgradeButton.svelte";

    export let upgrade: CaloriesUpgrade;
    export let icon = "/images/placeholder.png";

    $: isUnlocked = upgrade.isUnlocked;
</script>

{#if isUnlocked}
    <UpgradeButton {upgrade} {icon} currencyIcon="/images/placeholder.png"/>
{:else}
    <LockedUpgrade achievement={upgrade.requiredAchievement}/>
{/if}