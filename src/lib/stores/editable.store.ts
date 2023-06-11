import { writable } from 'svelte/store';

export let editable = writable<boolean>(false);
