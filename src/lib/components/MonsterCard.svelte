<script lang="ts">
    import type Monster from "../class/Monster";
    import { F, FSize } from "../format";
    import { game } from "../stores";

    export let monster: Monster;

    $: biteDamage = monster.getBiteDamage($game.meal.current);
    $: evolution = monster.evolution;
    $: monsterIcon = `./images/monster/${evolution.icon}`;
</script>

<div class="card-transparent flex flex-col items-center gap-1">
    <img src={monsterIcon} alt="Monster" class="w-44 h-44 xl:w-52 xl:h-52" draggable="false"/>
    <p class="font-semibold">{evolution.name}</p>
    <p><span class="stat blue">Size</span> {FSize(monster.size, 2, 2)}</p>
    <p><span class="stat green">Bite Dmg</span> {F(biteDamage)}</p>
    <p><span class="stat orange">Evoscore</span> {monster.evoMonsterScore.toNumber().toLocaleString("en-US")}</p>
</div>