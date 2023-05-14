import { DOMSerializer, DOMParser } from 'prosemirror-model';
import type { EditorState } from 'prosemirror-state';
import type { MarkType, NodeType } from 'prosemirror-model';

/**
 * Converts editor state to an HTML string
 * @param editorState
 * @returns {string}
 */
export function toHTML(editorState: EditorState): string {
	const serializer = DOMSerializer.fromSchema(editorState.schema);
	const fragment = serializer.serializeFragment(editorState.doc.content);
	const node = document.createElement('div');
	node.append(fragment);
	return node.innerHTML;
}

/**
 * Converts the editor state to plain text
 * @param editorState
 * @return {string}
 */
export function toPlainText(editorState: EditorState): string {
	if (editorState.doc.childCount === 0) {
		return '';
	} else if (editorState.doc.childCount === 1) {
		return editorState.doc.textContent;
	} else {
		const paragraphs = [];
		for (let i = 0; i < editorState.doc.childCount; i++) {
			paragraphs.push(editorState.doc.child(i).textContent);
		}
		return paragraphs.join('\n');
	}
}

export function fromHTML(schema: any, content: string): any {
	const doc = document.implementation.createHTMLDocument();
	doc.body.innerHTML = content;
	return DOMParser.fromSchema(schema).parse(doc.body);
}

export function markActive(type: MarkType | null) {
	return function (state: EditorState) {
		const { from, $from, to, empty } = state.selection;
		if (!type) return false; // mark might not be available in current schema
		if (empty) return type.isInSet(state.storedMarks || $from.marks());
		else return state.doc.rangeHasMark(from, to, type);
	};
}

export function canInsert(state: EditorState, nodeType: NodeType): boolean {
	const $from = state.selection.$from;
	for (let d = $from.depth; d >= 0; d--) {
		const index = $from.index(d);
		if ($from.node(d).canReplaceWith(index, index, nodeType)) return true;
	}
	return false;
}

export function markApplies(doc: any, ranges: any, type: MarkType): boolean {
	for (let i = 0; i < ranges.length; i++) {
		const { $from, $to } = ranges[i];
		let can = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;
		doc.nodesBetween($from.pos, $to.pos, (node: any) => {
			if (can) return false;
			can = node.inlineContent && node.type.allowsMarkType(type);
		});
		if (can) return true;
	}
	return false;
}

// Returns true when cursor (collapsed or not) is inside a link
export function linkActive(type: MarkType) {
	return function (state: EditorState) {
		const { from, to } = state.selection;
		return state.doc.rangeHasMark(from, to, type);
	};
}

export function blockTypeActive(type: NodeType, attrs: { [key: string]: any }) {
	return function (state: any) {
		// HACK: we fill in the id attribute if present, so the comparison works
		const dynAttrs = Object.assign({}, attrs);
		const { $from, to, node } = state.selection;
		if (node) {
			if (node.attrs.id) {
				dynAttrs.id = node.attrs.id;
			}
			return node.hasMarkup(type, dynAttrs);
		}
		if ($from.parent && $from.parent.attrs.id) {
			dynAttrs.id = $from.parent.attrs.id;
		}
		const result = to <= $from.end() && $from.parent.hasMarkup(type, dynAttrs);
		return result;
	};
}

// Returns the first mark found for a given type
// TODO: currently this doesn't covers the case where a link has just one character
export function getMarkAtCurrentSelection(type: string) {
	return function (state: any) {
		const { $from } = state.selection;
		return $from.marks().find((m: any) => m.type === type);
	};
}

export function markExtend($start: any, mark: any) {
	let startIndex = $start.index();
	let endIndex = $start.indexAfter();

	while (startIndex > 0 && mark.isInSet($start.parent.child(startIndex - 1).marks)) {
		startIndex--;
	}
	while (endIndex < $start.parent.childCount && mark.isInSet($start.parent.child(endIndex).marks)) {
		endIndex++;
	}

	let startPos = $start.start();
	let endPos = startPos;
	for (let i = 0; i < endIndex; i++) {
		const size = $start.parent.child(i).nodeSize;
		if (i < startIndex) startPos += size;
		endPos += size;
	}
	return { from: startPos, to: endPos };
}
