import { Language } from "./language.models";
import { UploaderTime } from "./uploadertime.model";

export class Uploader{
    constructor(
        public Id?: number,
        public Firstname?: string,
        public Surname?: string,
        public Email?: string,
        public Phone?: string,
        public Country?: string,
        public Password?: string,
        public Support?: boolean,
        public Languages?:Language[],
        public UploaderTimes?:UploaderTime[],
        public numberOfVideos?:number,
        public Earnings?:number,
        public AverageRating?:number,
        public Inactive?: boolean,
    ){

    }
}