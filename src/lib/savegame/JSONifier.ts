export default interface JSONifier{
    /** Any extra keys that are not calculated from savedObjects/Props */
    readonly extraKeys?: string[];
    /** Properties that will be revived */
    get savedObjects(): string[];
    /** Properties that will be assigned */
    get savedProps(): string[];
    /** Individual revive logic */
    revive?(obj: any): void;
}