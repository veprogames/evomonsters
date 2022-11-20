<script>
    import { game } from "../../stores";

    import AchievementComp from "../AchievementComp.svelte";
</script>

<div class="flex justify-center gap-4 w-full flex-wrap">
    <AchievementComp achievement={$game.achievements.achievements.yummy} icon="/images/achievements/plate.png"></AchievementComp>
    <AchievementComp achievement={$game.achievements.achievements.hungry} icon="/images/achievements/plate.png"></AchievementComp>
    <AchievementComp achievement={$game.achievements.achievements.mooh} icon="/images/achievements/plate.png"></AchievementComp>
    <AchievementComp achievement={$game.achievements.achievements.halfADay} icon="/images/achievements/food.png"></AchievementComp>
</div>