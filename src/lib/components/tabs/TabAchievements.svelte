<script>
    import { game } from "../../stores";

    import AchievementComp from "../AchievementComp.svelte";
</script>

<AchievementComp achievement={$game.achievements.achievements.yummy}></AchievementComp>