type messageInterface = {
    sentBy: string,
    sentTo: string,
    chatID: string,
    msgType: string,
    text: string,
    createdAt?: string,
    date: string
}

export interface ServerToClientEvents {
    serverMsg: (data: { msg: messageInterface; room: string}) => void
}

export interface ClientToServerEvents {
    joinRoom: (room: string) => void
    clientMsg: (data: { msg: messageInterface; room: string}) => void   
}