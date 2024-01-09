interface Props {
    userID: string;
    accessToken?: string;
    jwtAccessToken?: string;
    cursor?: string;
    count?: number;
    callback?: Function;
    preData?: string[];
}
export declare const getUserFollowers: ({ userID, accessToken, jwtAccessToken, cursor, count, callback, preData, }: Props) => Promise<string[]>;
export default getUserFollowers;
