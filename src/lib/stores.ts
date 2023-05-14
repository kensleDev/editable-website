import type { EditorView } from 'prosemirror-view';
import { writable } from 'svelte/store';

export const activeEditorView = writable<null | EditorView>(null);
