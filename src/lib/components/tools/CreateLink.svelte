<script lang="ts">
	import { classNames } from '$lib/util';
	import { toggleMark } from 'prosemirror-commands';
	import { createLink } from '$lib/prosemirror';
	import type { EditorState } from 'prosemirror-state';
	import type { EditorView } from 'prosemirror-view';

	export let editorView: EditorView;
	export let editorState: EditorState;

	$: schema = editorState.schema;
	$: disabled = !createLink(editorState);

	function handleClick() {
		let url = prompt('Enter link URL', 'https://example.com');
		if (url) {
			toggleMark(schema.marks.link, { href: url })(editorState, editorView.dispatch);
			editorView.focus();
		}
	}
</script>

<button
	on:click={handleClick}
	{disabled}
	class={classNames('disabled:opacity-30 rounded-full p-2 sm:mx-1 hover:bg-gray-100')}
>
	<slot />
</button>
