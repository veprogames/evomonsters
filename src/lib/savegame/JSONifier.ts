export default interface JSONifier{
    get JSONreplaced(): object;
    revive(obj: any): void;
}