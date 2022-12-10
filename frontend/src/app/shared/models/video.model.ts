import { Language } from "./language.models";
import { UploaderTime } from "./uploadertime.model";
export class Video{
    constructor(
        public VideoId?: number,
        public UploaderId?: number,
        public UploaderName?: string,
        public DeviceId?: number,
        public LanguageId?: number,
        public Language?: string,
        public LanguageCode?: string,
        public Views?: number,
        public Blocked?: boolean,
        public Url?: string,
        public SubUrl?:string,
        public Price?: number,
        public Approved?: boolean,
        public Model?: string,
        public DeviceBrand?:string,
        public DeviceType?:string,
        public Date?:Date,
        public Duration?:number,
        public AverageRating?:number,
        public Support?:boolean,
        public durationStr?:string,
        public Phone?:string,
        public Disabled?:boolean,
        public Languages?:Language[],
        public UploaderTimes?:UploaderTime[]
    ){
    }
}