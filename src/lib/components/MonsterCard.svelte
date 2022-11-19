<script lang="ts">
    import type Monster from "../class/Monster";
    import { F, FSize } from "../format";
    import { game } from "../stores";

    export let monster: Monster;

    $: biteDamage = monster.getBiteDamage($game.meal.current);
</script>

<div class="card-transparent flex flex-col items-center gap-1">
    <img src="/images/monster/0.png" alt="Monster" class="w-28 h-28 lg:w-44 lg:h-44"/>
    <p class="font-semibold">Hatchling</p>
    <p><span class="stat blue">Size</span> {FSize(monster.size, 2, 2)}</p>
    <p><span class="stat green">Bite Dmg</span> {F(biteDamage)}</p>
</div>