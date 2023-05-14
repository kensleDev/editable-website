import { markApplies, canInsert } from '$lib/prosemirror';
import type { EditorState } from 'prosemirror-state';

export function createLink(state: EditorState): boolean {
	const schema = state.schema;
	const markType = schema.marks.link;
	if (!markType) return false;
	const { $cursor, ranges, from, to } = state.selection as any;
	const allowed = markApplies(state.doc, ranges, markType);
	const hasLink = state.doc.rangeHasMark(from, to, markType);
	// Disable if either the cursor is collapsed, the mark does not apply or is already present
	if ($cursor || !allowed || hasLink) return false;
	return true;
}

export function insertImage(state: EditorState): boolean {
	const nodeType = state.schema.nodes.image;
	if (!nodeType) return false;
	if (!canInsert(state, nodeType)) return false;
	return true;
}
