export const getCurrentHours = () =>
	`${new Date().getHours()}:${new Date().getMinutes()}`;

export const getToday = () => new Date().toISOString().slice(0, 10);
