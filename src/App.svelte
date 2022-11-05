<script lang="ts">
    import Decimal from "break_infinity.js";
    import { F } from "./lib/format";
    import { game } from "./lib/stores";

    setInterval(() => $game.calories.amount = $game.calories.amount.add(1), 100);
    setInterval(() => $game.calories.amount = new Decimal(0), 3500);
</script>

<h1 class="text-green-400 text-4xl p-8">Helo {F($game.calories.amount, 2)}</h1>
<p>Your highest is {F($game.calories.highest, 2)}</p>
<p>Your total is {F($game.calories.total, 2)}</p>
<p>Size: {$game.monster.size}m</p>
<footer class="fixed bottom-0 w-full">
    Version {$game.version}
</footer>