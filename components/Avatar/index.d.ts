import React from 'react';
interface AvatarProps {
    /** The URL of the avatar image. */
    avatarUrl?: string;
    /** The URL for a fallback avatar image if the primary one fails or isn't provided. */
    defaultAvatarUrl?: string;
    /** Alt text for the image. Important for accessibility. */
    alt?: string;
    /**
     * The size (width and height) of the avatar's image area in pixels.
     * Note: The `isLive` ring will add to the total dimensions.
     * @default 52
     */
    size?: number;
    /**
     * CSS border property for the avatar.
     * @example '2px solid white'
     */
    border?: string;
    /** If true, displays a purple ring indicating a "live" status. */
    isLive?: boolean;
    /** If true, shows a skeleton loading state. This takes precedence over other states. */
    isLoading?: boolean;
    /**
     * Custom callback function when the avatar is clicked.
     * If `isRedirectEnabled` is also true, this callback is executed *before* the redirection logic.
     */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * If true, enables redirection to the user's profile or live room on click.
     * `userID` and `openID` must be provided.
     * @default false
     */
    isRedirectEnabled?: boolean;
    /** The user's ID, required for redirection. */
    userID?: string;
    /** The user's openID, required for redirection. */
    openID?: string;
    /** The stream ID if the user is live, used for redirection to the live room. */
    streamID?: number;
}
export declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
