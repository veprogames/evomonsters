<script lang="ts">
    import { isMobile } from "../../../ismobile";
    import { game } from "../../stores";
    import TabNotations from "./settings/TabNotations.svelte";
    import TabSaveLoad from "./settings/TabSaveLoad.svelte";

    let tab = TabSaveLoad;
    
</script>

<div class="w-full card-transparent max-w-5xl mx-auto">
    <div class="flex justify-evenly flex-wrap">
        <TabSaveLoad/>
        <TabNotations/>
    </div>
    <p>Version {$game.versionPretty} ◦ Platform: {isMobile() ? "Mobile" : "Desktop"}</p>
</div>