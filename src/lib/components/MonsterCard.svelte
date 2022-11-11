<script lang="ts">
    import type Monster from "../class/Monster";
    import { F, FSize } from "../format";
    import { game } from "../stores";

    export let monster: Monster;

    $: biteDamage = monster.getBiteDamage($game.meal.current);
</script>

<div class="card flex flex-col items-center gap-1">
    <img src="/images/placeholder.png" alt="Monster" class="w-24 h-24 lg:w-36 lg:h-36"/>
    <p class="font-semibold">Young Monster</p>
    <p>Size: {FSize(monster.size, 2, 2)}</p>
    <p>Bite Dmg: {F(biteDamage)}</p>
</div>