<script lang="ts">
    import { getSaveCode, loadFromStorage, loadGame, saveGame } from "../../savegame/saveload";
    import { game } from "../../stores";

    let importCode = "";
    let a: HTMLAnchorElement;

    $: saveCode = getSaveCode($game);
    $: href = "data:text/plain;charset=utf-8," + saveCode;

    function download(){
        a.click();
    }

    function importGame(){
        try{
            $game = loadGame(importCode);
            importCode = "";
        }
        catch(e){
            alert("Something went wrong while importing");
        }
    }
</script>

<div class="card-transparent max-w-sm">
    <button on:click={() => saveGame($game)}>Manually Save Game</button>
    <button on:click={download}>Download Savegame</button>
    <textarea class="w-full h-32" placeholder="Paste Code to import here" bind:value={importCode}></textarea>
    <button on:click={importGame}>Import from Textbox</button>
    <a bind:this={a} class="hidden" download="evomonsters.save.txt" {href}>Download</a>
</div>