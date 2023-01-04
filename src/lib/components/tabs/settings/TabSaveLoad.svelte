<script lang="ts">
    import { getSaveCode, hardResetGame, loadGame, saveGame, saveSettings } from "../../../savegame/saveload";
    import { game, settings } from "../../../stores";

    let importCode = "";
    let a: HTMLAnchorElement;

    let hardResetConfirmation = "";

    $: saveCode = getSaveCode($game);
    $: href = "data:text/plain;charset=utf-8," + saveCode;

    function download(){
        a.click();
    }

    function manuallySave(){
        saveGame($game);
        saveSettings($settings);
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

    function hardReset(){
        if(hardResetConfirmation === "I really want to hard reset!"){
            $game = hardResetGame();
            hardResetConfirmation = "";
        }
    }
</script>

<div class="max-w-sm">
    <h2>Save Management</h2>
    <button on:click={manuallySave}>Manually Save Game</button>
    <button on:click={download}>Download Savegame</button>
    <textarea class="w-full h-16" placeholder="Paste Code to import here" bind:value={importCode}></textarea>
    <button on:click={importGame}>Import from Textbox</button>
    <a bind:this={a} class="hidden" download="evomonsters.save.txt" {href}>Download</a>
    <h2 class="text-orange-400">Danger Zone</h2>
    <p>If you want to hard reset the Game, type 'I really want to hard reset!' into the textbox and double click 'Hard Reset'</p>
    <input bind:value={hardResetConfirmation}/>
    <button class="error" on:dblclick={hardReset}>Hard Reset</button>
</div>