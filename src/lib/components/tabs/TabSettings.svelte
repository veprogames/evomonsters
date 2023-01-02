<script lang="ts">
    import { isMobile } from "../../../ismobile";
    import { game } from "../../stores";
    import TabNotations from "./settings/TabNotations.svelte";
    import TabSaveLoad from "./settings/TabSaveLoad.svelte";

    let tab = TabSaveLoad;
    
</script>

<div class="card-transparent max-w-sm">
    <div class="flex justify-center gap-2 py-2">
        <button on:click={() => tab = TabSaveLoad}>Save & Load</button>
        <button on:click={() => tab = TabNotations}>Notations</button>
    </div>

    <svelte:component this={tab}></svelte:component>

    <p>Version {$game.versionPretty} ◦ Platform: {isMobile() ? "Mobile" : "Desktop"}</p>
</div>