export default interface IPurchasable {
    getPrice(): number;

    getDescription(): string;

    getProduct(): any;
}