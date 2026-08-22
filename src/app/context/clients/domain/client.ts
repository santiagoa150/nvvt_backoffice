export interface Client {
	readonly clientId: string;
	readonly fullName: string;
	readonly phone: string | null;
}

export interface CreateClient {
	readonly givenNames: string;
	readonly familyNames: string | null;
	readonly countryPhoneCode: number | null;
	readonly phoneNumber: string | null;
}
