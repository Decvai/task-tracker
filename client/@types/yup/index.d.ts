export {};

declare module 'yup' {
	interface StringSchema {
		confirmPassword(errorMessage: string): DateSchema;
	}
}
