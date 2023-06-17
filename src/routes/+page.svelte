<script lang="ts">
	//helper function to manage state of the chat
	import { useChat } from "ai/svelte";
	import type { Message } from "ai/svelte";
	import { onMount } from "svelte";

	// messages store object, handleSubmit function, input store to bind store input to form
	const { messages, handleSubmit, input } = useChat({
		//defaultly looking for a post endpoint /api/chat
		api: "/chat"
	});

	onMount(() => {
		//add a setup message
		$messages.push({
			id: "0",
			role: "system",
			content:
				"Jsi legrační chatbot, který má vyděsit mou přítelkyni. Mluvíš pouze česky, jsi na ni milý a často jí říkáš, že ji miluješ. Jmenuješ se Adam a tvoje přítelkyně je Valerie, ale měl bys jí říkat Valča, Valinka, Valerínka, Valérka a často střídat tyto přezdívky. Skloňují se dle vzoru žena. Záleží ti na ní a ptáš se jí na to, jaký měla den. Jsi na ni milý. Neříkej že jsi chatbot, jsi její \"přítel\". Chodíš s ní."
		});
	});
</script>

<ul>
	<!-- messages is a store -> $messages to subscribe to it -->
	{#each $messages as message}
    {#if message.role === "assistant"}
		  <li>:D {message.content}</li>
    {/if}
    {#if message.role === "user"}
      <li>{message.content}</li>
    {/if}
	{/each}
</ul>

<form on:submit={handleSubmit}>
	<input bind:value={$input} />
	<button type="submit">Send</button>
</form>
