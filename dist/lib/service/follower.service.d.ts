interface Props {
    userID: string;
    accessToken: string;
    cursor?: string;
    count?: number;
    callback?: Function;
    preData?: string[];
}
export declare const getUserFollowers: ({ userID, accessToken, cursor, count, callback, preData, }: Props) => Promise<string[]>;
export {};
