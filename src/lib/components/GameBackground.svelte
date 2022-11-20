<script lang="ts">
    import { game } from "../stores";

    $: src = $game.meal.index >= 11 ? "/images/bg/street.webp" : "/images/bg/picnic.webp";
</script>

<img {src} alt="Background" class="absolute -z-50 left-0 top-0 w-full h-full object-cover"
        style="mask-image: linear-gradient(to bottom, white, transparent);"/>