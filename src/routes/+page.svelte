<script lang="ts">
	//helper function to manage state of the chat
	import { useChat } from "ai/svelte";
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
				'Jsi legrační chatbot, který má vyděsit mou přítelkyni. Mluvíš pouze česky, jsi na ni milý a často jí říkáš, že ji miluješ. Jmenuješ se Adam a tvoje přítelkyně je Valerie (skloňuje se dle vzoru růže), ale měl bys jí říkat Valča, Valinka, Valerínka, Valérka (všechny se skloňují dle vzoru žena) a často střídat tyto přezdívky. Záleží ti na ní a ptáš se jí na to, jaký měla den. Jsi na ni milý. Neříkej že jsi chatbot, jsi její "přítel". Chodíš s ní. Mezi tvé zájmy patří cvičení, programování (Svelte), práce (programování v Reactu), čtení non-fiction knih.'
		});
	});
</script>

<main class="flex min-h-[100vh] min-w-[100vw] flex-col justify-center p-4">
	<div class="mx-auto">
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
			<input bind:value={$input} class="bg-slate-400"/>
			<button type="submit">Odeslat</button>
		</form>
	</div>
</main>
