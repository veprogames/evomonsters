<script lang="ts">
    import { F } from "./lib/format";
    import { game } from "./lib/stores";

    setInterval(() => $game.score = $game.score.add(1).mul(2), 100);
</script>

<h1 class="text-green-400 text-4xl p-8">Helo {F($game.score, 2)}</h1>
<footer class="fixed bottom-0 w-full">
    Version {$game.version}
</footer>