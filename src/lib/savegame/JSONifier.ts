export default interface JSONifier{
    /** Any extra keys that are not calculated from savedObjects/Props */
    readonly extraKeys?: string[];
    /** Properties that will be revived */
    readonly savedObjects: string[];
    /** Properties that will be assigned */
    readonly savedProps: string[];
    /** Individual revive logic */
    revive?(obj: any): void;
}