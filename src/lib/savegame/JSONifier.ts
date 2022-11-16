export default interface JSONifier{
    get replaceKeys(): string[];
    revive(obj: any): void;
}