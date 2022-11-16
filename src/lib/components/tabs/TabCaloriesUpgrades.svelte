<script>
    import { game } from "../../stores";

    import CaloriesUpgradeButton from "../upgrades/CaloriesUpgradeButton.svelte";
</script>

<CaloriesUpgradeButton upgrade={$game.calories.upgrades.telekinesis}/>