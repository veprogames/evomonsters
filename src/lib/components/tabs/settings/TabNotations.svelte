<script lang="ts">
    import gamenotations from "../../../gamenotations";
    import { settings } from "../../../stores";

    $: current = $settings.notation.name;
</script>

<div class="flex gap-2 flex-wrap">
    {#each gamenotations as notation}
        <button class:text-green-400={current === notation.name} on:click={() => $settings.setNotation(notation.name)}>{notation.name}</button>
    {/each}
</div>