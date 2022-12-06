<script lang="ts">
    let el: HTMLElement;
    let w: number;
    $: x = el?.getBoundingClientRect()?.left ?? 0;
    $: rightOverflow = x + w > window.innerWidth
</script>

<div bind:this={el} bind:clientWidth={w} class="scale-0 group-hover:scale-100 transition-transform
    absolute w-32 lg:w-52 md:w-40
    text-left card-less-transparent z-10 pointer-events-none"
    class:right={!rightOverflow}
    class:left={rightOverflow}>
    <slot/>
</div>

<style lang="postcss">
    div.right{
        @apply origin-top-left left-full top-0;
    }

    div.left{
        @apply origin-top-right right-full top-0;
    }
</style>