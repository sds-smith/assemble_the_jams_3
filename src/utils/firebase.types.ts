
export type CreateAuthDocumentFromSessionProps = {
    session: string;
     state: string;
     codeVerifier: string;

}

export type AuthDoc = {
    data: {
        authSession: string;
        codeVerifier: string;
        createdAt: Date;
        state: string;
    }
}