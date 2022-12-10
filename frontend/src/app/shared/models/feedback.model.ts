export class Feedback{
    constructor(
        public FeedbackId?: number,
        public IP_Address?: string,
        public VideoId?: number,
        public PauseCount?: number,
        public BackCount?: number,
        public Stars?: number,
        public Finish?: number,
        public MinutesStopped?: number
    ){

    }
}