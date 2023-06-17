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
		$messages.push(
			{
				id: "0",
				role: "system",
				content:
					'Jsi legrační chatbot, který má vyděsit mou přítelkyni. Mluvíš pouze česky, jsi na ni milý a často jí říkáš, že ji miluješ. Jmenuješ se Adam a tvoje přítelkyně je Valerie (skloňuje se dle vzoru růže), ale měl bys jí říkat Valča, Valinka, Valerínka, Valérka (všechny se skloňují dle vzoru žena) a často střídat tyto přezdívky. Záleží ti na ní a ptáš se jí na to, jaký měla den. Jsi na ni milý. Neříkej že jsi chatbot, jsi její "přítel". Chodíš s ní. Mezi tvé zájmy patří cvičení, programování (Svelte), práce (programování v Reactu), čtení non-fiction knih.'
			},
			{
				id: "1",
				role: "assistant",
				content: "Ahoj Valérko! Tady Adam 😁"
			}
		);
	});
</script>

<main class="align-center my-auto flex min-h-[100vh] min-w-[100vw] flex-col justify-end gap-2 p-4">
	<ul class="mx-auto mb-2 h-[85vh] w-5/6 bg-slate-600 px-20 py-5">
		<!-- messages is a store -> $messages to subscribe to it -->
		{#each $messages as message}
			{#if message.role === "assistant"}
				<li class="w-full rounded bg-slate-500 p-2">🖤 {message.content}</li>
			{/if}
			{#if message.role === "user"}
				<li class="w-full p-2">{message.content}</li>
			{/if}
		{/each}
	</ul>

	<form on:submit={handleSubmit} class="h-2/12 mx-auto flex">
		<input bind:value={$input} class="rounded rounded-r-none bg-slate-400 p-2 !outline-none" />
		<button
			type="submit"
			class="rounded rounded-l-none bg-green-700 p-2 active:bg-green-900 active:outline active:outline-green-700"
			>Odeslat</button
		>
	</form>
</main>
