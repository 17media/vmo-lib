export type Translation = {
    key: string;
    values: {
        language: string;
        value: string;
    }[];
};
export declare const getTranslation: (eventType: string) => Promise<Translation[]>;
