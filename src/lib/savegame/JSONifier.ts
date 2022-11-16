export default interface JSONifier{
    get replaceKeys(): string[];
    /** Properties that will be revived */
    get reviveKeys(): string[];
    /** Properties that will be assigned */
    get reviveProps(): string[];
    /** Individual revive logic */
    revive?(obj: any): void;
}