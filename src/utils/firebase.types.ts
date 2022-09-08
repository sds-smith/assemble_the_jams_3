
export type CreateAuthDocumentFromSessionProps = {
    session: string;
     state: string;
     codeVerifier: string;

}

export type AuthDoc = {
        authSession: string;
        codeVerifier: string;
        createdAt: Date;
        state: string;
        accessToken: string;
}