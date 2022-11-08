<script lang="ts">
    import type Monster from "../class/Monster";
    import { F } from "../format";
    import { game } from "../stores";

    export let monster: Monster;

    $: biteDamage = monster.getBiteDamage($game.meal.current);
</script>

<div class="card flex flex-col items-center gap-4">
    <img src="/images/placeholder.png" alt="Monster" class="w-24 h-24"/>
    <p class="font-semibold">Young Monster</p>
    <p>Size: {F(monster.size, 2, 2)}m</p>
    <p>Mass: {F(monster.mass, 2, 3)}u</p>
    <p>Bite Dmg: {F(biteDamage)}</p>
</div>