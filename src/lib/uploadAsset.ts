async function getSignedUrl(path: string, type: string): Promise<string> {
	const response = await fetch(`/api/presignedurl?path=${path}&type=${type}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}
	});
	const { signedUrl } = await response.json();
	return signedUrl;
}

function uploadS3(
	url: string,
	file: File,
	progressCallback?: (percentComplete: number) => void
): Promise<XMLHttpRequest> {
	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(xhr);
				} else {
					reject(xhr);
				}
			}
		};

		if (progressCallback) {
			xhr.upload.onprogress = (e) => {
				if (e.lengthComputable) {
					const percentComplete = (e.loaded / file.size) * 100;
					progressCallback(parseInt(percentComplete.toString(), 10));
				}
			};
		}

		xhr.open('put', url);
		xhr.setRequestHeader('Content-Type', file.type);
		xhr.setRequestHeader('x-amz-acl', 'public-read');
		xhr.send(file);
	});
}

export default async function uploadAsset(
	file: File,
	path: string,
	onProgress?: (percentComplete: number) => void
): Promise<string> {
	const signedUrl = await getSignedUrl(path, file.type);
	await uploadS3(signedUrl, file, onProgress);
	return path;
}
