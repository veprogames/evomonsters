<script lang="ts">
    import type Achievement from "../class/achievements/Achievement";


    export let achievement: Achievement;
    export let icon = "/images/placeholder.png";
</script>

<div class="relative inline-flex justify-center items-center
    w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-md group">
    <img src={icon} alt="Achievement Icon" class="w-16 h-16"/>
    <div class="tooltip">
        <p class="text-blue-400 font-bold">{achievement.title}</p>
        <p>{achievement.description}</p>
    </div>
</div>