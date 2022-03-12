export const getCurrentHours = (): string =>
	`${new Date().getHours()}:${new Date().getMinutes()}`;

export const getToday = (): string => new Date().toISOString().slice(0, 10);

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
