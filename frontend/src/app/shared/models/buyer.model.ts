export class Buyer{
    constructor(
        public BuyerId?: number,
        public Name?: string,
        public CreditCardNumbers?: number,
        public Token?: string,
        public Email?:string,
        public Password?:string
    ){
    }
}