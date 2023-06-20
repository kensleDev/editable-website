import { camelCaseToTitleCase } from '$lib/services/text.service';
import { readdirSync } from 'fs';

export async function getAvalibleComponents() {
	const featureDirs = readdirSync(process.cwd() + '/src/lib/features');
	const mappedDirs = featureDirs.map((dir) => ({ dir, name: camelCaseToTitleCase(dir) }));
	return mappedDirs;
}
