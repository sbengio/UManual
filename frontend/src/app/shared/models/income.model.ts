export class Income{
    constructor(
        public Id?: number,
        public VideoId?: number,
        public BuyerId?: number,
        public Date?: Date,
        public Model?: string,
        public DeviceBrand?:string,
        public DeviceType?:string,
        public AverageRating?:number,
        public Views?: number,
        public Url?: string,
        public SubUrl?:string,
        public Email?:string
    ){
    }
}