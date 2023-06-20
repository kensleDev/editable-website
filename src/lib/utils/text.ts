export const camelCaseToTitleCase = (str: string) => {
	return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

export const firstToUpper = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
