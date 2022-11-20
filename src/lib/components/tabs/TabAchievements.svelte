<script>
    import { game } from "../../stores";

    import AchievementComp from "../AchievementComp.svelte";

    $: achievements = $game.achievements.achievements;
</script>

<div class="flex justify-center gap-4 w-full flex-wrap">
    <div class="flex flex-col gap-4">
        <AchievementComp achievement={achievements.yummy} icon="/images/achievements/plate.png"></AchievementComp>
        <AchievementComp achievement={achievements.hungry} icon="/images/achievements/plate.png"></AchievementComp>
        <AchievementComp achievement={achievements.mooh} icon="/images/achievements/plate.png"></AchievementComp>
        <AchievementComp achievement={achievements.toSpace} icon="/images/achievements/plate.png"></AchievementComp>
    </div>
    <div class="flex flex-col gap-4">
        <AchievementComp achievement={achievements.halfADay} icon="/images/achievements/food.png"></AchievementComp>
        <AchievementComp achievement={achievements.manyDays} icon="/images/achievements/food.png"></AchievementComp>
        <AchievementComp achievement={achievements.foodOverflow} icon="/images/achievements/food.png"></AchievementComp>
        <AchievementComp achievement={achievements.endHunger} icon="/images/achievements/food.png"></AchievementComp>
    </div>
</div>