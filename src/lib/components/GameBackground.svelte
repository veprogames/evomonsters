<script lang="ts">
    import { game } from "../stores";

    interface BackgroundDefinition{
        index: number,
        image: string
    };

    const bgs: BackgroundDefinition[] = [
        {
            index: 0,
            image: "picnic.webp"
        },
        {
            index: 12,
            image: "street.webp"
        },
        {
            index: 18,
            image: "city.webp"
        },
        {
            index: 25,
            image: "earth.webp"
        },
        {
            index: 34,
            image: "space.webp"
        }
    ].reverse();

    let src: string;
    $: {
        const bg = bgs.find(bg => $game.meal.index >= bg.index);
        src = `./images/bg/${bg.image}`;
    }
</script>

<img {src} alt="Background" class="absolute -z-50 left-0 top-0 w-full h-full object-cover"
        style="mask-image: linear-gradient(to bottom, white, transparent);"/>