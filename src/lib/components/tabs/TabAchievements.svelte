<script>
    import { game } from "../../stores";

    import AchievementComp from "../AchievementComp.svelte";

    $: achievements = $game.achievements.achievements;
</script>

<div class="card-transparent w-fit flex justify-center space-x-4 text-lg text-center mx-auto my-4">
    <div>
        <span class="stat green">Unlocked</span> {$game.achievements.countUnlocked} / {Object.values(achievements).length}
    </div>
    <div>
        <span class="stat orange">%</span> {($game.achievements.percentComplete * 100).toFixed(0)}
    </div>
</div>
<div class="flex justify-center gap-4 w-full flex-wrap">
    <div class="achievement-row">
        <AchievementComp achievement={achievements.yummy} icon="./images/achievements/plate.png"></AchievementComp>
        <AchievementComp achievement={achievements.hungry} icon="./images/achievements/plate.png"></AchievementComp>
        <AchievementComp achievement={achievements.mooh} icon="./images/achievements/plate.png"></AchievementComp>
        <AchievementComp achievement={achievements.toSpace} icon="./images/achievements/plate.png"></AchievementComp>
        <AchievementComp achievement={achievements.village} icon="./images/achievements/plate.png"></AchievementComp>
        <AchievementComp achievement={achievements.neowise} icon="./images/achievements/plate.png"></AchievementComp>
    </div>
    <div class="achievement-row">
        <AchievementComp achievement={achievements.halfADay} icon="./images/achievements/food.png"></AchievementComp>
        <AchievementComp achievement={achievements.manyDays} icon="./images/achievements/food.png"></AchievementComp>
        <AchievementComp achievement={achievements.foodOverflow} icon="./images/achievements/food.png"></AchievementComp>
        <AchievementComp achievement={achievements.assimilation} icon="./images/achievements/food.png"></AchievementComp>
        <AchievementComp achievement={achievements.endHunger} icon="./images/achievements/food.png"></AchievementComp>
    </div>
    <div class="achievement-row">
        <AchievementComp achievement={achievements.mutated} icon="./images/resources/genetic.png">
            <p slot="description">Reach 1 Genetic Point<br/><span class="font-semibold text-blue-400">This will unlock "Max All" for Calorie Upgrades!</span></p>
        </AchievementComp>
        <AchievementComp achievement={achievements.geneticSharpness} icon="./images/resources/genetic.png"></AchievementComp>
        <AchievementComp achievement={achievements.geneticFitness} icon="./images/resources/genetic.png"></AchievementComp>
    </div>
</div>

<style lang="postcss">
    div.achievement-row{
        @apply flex flex-col gap-4;
    }
</style>