import { ReactNode } from "react";

export type ClientContextProps = {
    clientToken: string;
    setClientToken(clientToken: string): void
}

export type PlayerContextProps = {
    currentPlayer : null,
    setCurrentPlayer : () => null,
    deviceID : null,
    setDeviceId : () => null,
    nowPlaying : null,
    setNowPlaying : () => null,
    active : null,
    setActive : () => null
}

export type ProviderProps = {
    children?: ReactNode
}
