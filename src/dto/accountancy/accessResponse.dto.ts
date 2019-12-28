export interface AccessResponse {
    token_type: string;
    access_token: string;
    expires_in: number;
    consented_on: number;
    scope: string;
    refresh_token: string;
    refresh_token_expires_in: number;
}
