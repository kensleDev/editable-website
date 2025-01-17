export function classNames(...classes: (string | undefined | null | boolean)[]): string {
	return classes.filter(Boolean).join(' ');
}

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/**
 * Generates a unique id.
 *
 * @param {String} [prefix] if provided the UUID will be prefixed.
 * @param {Number} [len] if provided a UUID with given length will be created.
 * @return A generated uuid.
 */
export function uuid(prefix?: string, len?: number): string {
	if (prefix && prefix[prefix.length - 1] !== '-') {
		prefix = prefix.concat('-');
	}
	const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
	const uuid = [];
	const radix = 16;
	let idx;
	len = len || 32;
	if (len) {
		// Compact form
		for (idx = 0; idx < len; idx++) uuid[idx] = chars[0 | (Math.random() * radix)];
	} else {
		// rfc4122, version 4 form
		let r;
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

export function formatDate(dateString: string, withTime: boolean): string {
	const date = new Date(dateString);
	if (withTime) {
		if (date.toDateString() === new Date().toDateString()) {
			// on same day, only show the time
			return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
		} else {
			const opts: Intl.DateTimeFormatOptions = {
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				hour12: true
			};
			if (date.getFullYear() !== new Date().getFullYear()) {
				opts.year = 'numeric';
			}
			return date.toLocaleDateString('en-US', opts);
		}
	} else {
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
}

export function debounce(
	node: Node,
	params: { func: () => void; duration: number }
): { update: () => void; destroy: () => void } {
	let timer: ReturnType<typeof setTimeout>;

	return {
		update() {
			clearTimeout(timer);
			timer = setTimeout(params.func, params.duration);
		},
		destroy() {
			clearTimeout(timer);
		}
	};
}

export function extractTeaser(body: HTMLElement): string {
	const teaser = [...body.querySelectorAll('p')].map((n) => n.textContent).join(' ');
	if (teaser.length > 512) {
		return teaser.slice(0, 512).concat('…');
	} else {
		return teaser;
	}
}

export function resizeImage(file: File, maxWidth: number, maxHeight: number, quality: number) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	return new Promise((resolve, reject) => {
		reader.onload = (event) => {
			const image = new Image();
			image.src = event.target?.result as string;
			image.onload = () => {
				const width = image.width;
				const height = image.height;
				let newWidth = width;
				let newHeight = height;
				if (width > maxWidth) {
					newWidth = maxWidth;
					newHeight = (height * maxWidth) / width;
				}
				if (newHeight > maxHeight) {
					newWidth = (newWidth * maxHeight) / newHeight;
					newHeight = maxHeight;
				}
				const canvas = document.createElement('canvas');
				canvas.width = newWidth;
				canvas.height = newHeight;

				const context = canvas.getContext('2d');

				context?.drawImage(image, 0, 0, newWidth, newHeight);
				canvas.toBlob(
					(blob) => {
						resolve(blob);
					},
					file.type,
					quality
				);
			};
			image.onerror = (error) => {
				reject(error);
			};
		};
		reader.onerror = (error) => {
			reject(error);
		};
	});
}
/**
 * Get image dimensions from a file
 */
export async function getDimensions(file: File): Promise<{ width: number; height: number }> {
	return new Promise((resolve, reject) => {
		const img = new window.Image();

		img.onload = function () {
			resolve({ width: this.width, height: this.height });
		};

		img.onerror = function (e) {
			reject(e);
		};

		img.src = URL.createObjectURL(file);
	});
}

export async function fetchJSON<T>(method: string, url: string, data?: T): Promise<T> {
	const response = await fetch(url, {
		method: method,
		body: JSON.stringify(data),
		headers: {
			'content-type': 'application/json'
		}
	});
	if (!response.ok) throw new Error(response.statusText);
	const result = await response.json();
	return result as T;
}
