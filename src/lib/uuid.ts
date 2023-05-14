/**
 * Generates a unique id.
 *
 * @param {String} [prefix] if provided the UUID will be prefixed.
 * @param {Number} [len] if provided a UUID with given length will be created.
 * @return A generated uuid.
 */
export default function uuid(prefix?: string, len?: number): string {
	if (prefix && prefix[prefix.length - 1] !== '-') {
		prefix = prefix.concat('-');
	}
	const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
	const uuid: string[] = [];
	const radix = 16;
	let idx: number;
	len = len || 32;
	if (len) {
		// Compact form
		for (idx = 0; idx < len; idx++) uuid[idx] = chars[0 | (Math.random() * radix)];
	} else {
		// rfc4122, version 4 form
		let r: number;
		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (idx = 0; idx < 36; idx++) {
			if (!uuid[idx]) {
				r = 0 | (Math.random() * 16);
				uuid[idx] = chars[idx === 19 ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return (prefix || '') + uuid.join('');
}
