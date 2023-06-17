<script lang="ts">
  //helper function to manage state of the chat
	import { useChat } from "ai/svelte";

  // messages store object, handleSubmit function, input store to bind store input to form
  const { messages, handleSubmit, input } = useChat({
    //defaultly looking for a post endpoint /api/chat
    api: "/chat"
  });
</script>

<ul>
  <!-- messages is a store -> $messages to subscribe to it -->
  {#each $messages as message}
    <li>{message.role} says... {message.content}</li>
  {/each}
</ul>

<form on:submit={handleSubmit}>
  <input bind:value={$input} />
  <button type="submit">Send</button>
</form>