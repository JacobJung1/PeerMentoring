import { writable } from 'svelte/store';

export const loggedInName = writable("");
export const loggedInEmail = writable("");
export const loggedInId = writable(0);
export const userType = writable("");