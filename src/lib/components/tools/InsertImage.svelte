<script lang="ts">
	import { classNames, resizeImage, getDimensions } from '$lib/util';
	import { uuid } from '$lib/util';
	import uploadAsset from '$lib/uploadAsset';
	import { insertImage } from '$lib/services/prosemirror';
	import type { Session } from '@supabase/supabase-js';
	import type { EditorView } from 'prosemirror-view';
	import type { EditorState } from 'prosemirror-state';
	import type { Node } from 'prosemirror-model';

	const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;

	export let editorView: EditorView;
	export let editorState: EditorState;
	export let session: Session | null;

	let fileInput: any; // for uploading an image
	let progress: number | undefined = undefined; // file upload progress

	$: schema = editorState.schema;
	$: disabled = !insertImage(editorState);

	async function uploadImage() {
		const file = fileInput.files[0];

		// We convert all uploads to the WEBP image format
		const extension = 'webp';
		const path = [['editable-website', 'images', uuid()].join('/'), extension].join('.');

		const maxWidth = 1440;
		const maxHeight = 1440;
		const quality = 0.8;

		const resizedBlob = (await resizeImage(file, maxWidth, maxHeight, quality)) as BlobPart;
		const resizedFile = new File([resizedBlob], `${file.name.split('.')[0]}.webp`, {
			type: 'image/webp'
		});

		const { width, height } = await getDimensions(resizedFile);
		const src = session ? `${ASSET_PATH}/${path}` : URL.createObjectURL(resizedFile);

		progress = 0;
		try {
			if (session) {
				await uploadAsset(resizedFile, path, (p) => {
					progress = p;
				});
			}

			editorView.dispatch(
				editorState.tr.replaceSelectionWith(
					schema.nodes.image.createAndFill({
						src,
						width,
						height
					}) as Node
				)
			);
			editorView.focus();
			progress = undefined;
		} catch (err) {
			console.error(err);
			progress = undefined;
		}
		fileInput.value = null;
	}
</script>

<input
	class="w-px h-px opacity-0 fixed -top-40"
	type="file"
	accept="image/*"
	name="imagefile"
	multiple
	bind:this={fileInput}
	on:change={uploadImage}
/>
<button
	on:click={() => fileInput.click()}
	{disabled}
	class={classNames('hover:bg-gray-100 sm:mx-1 rounded-full p-2 disabled:opacity-30')}
>
	<slot />
	{progress || ''}
</button>
