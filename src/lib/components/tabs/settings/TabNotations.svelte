<script lang="ts">
    import gamenotations from "../../../gamenotations";
    import { settings } from "../../../stores";

    $: current = $settings.notation.name;

    function setNotation(name: string){
        // notify all store subscribers so the buttons get updated properly
        settings.update(s => {
            s.setNotation(name);
            return s;
        });
    }
</script>

<div class="flex gap-2 flex-wrap">
    {#each gamenotations as notation}
        <button class:text-green-400={current === notation.name} on:click={() => setNotation(notation.name)}>{notation.name}</button>
    {/each}
</div>