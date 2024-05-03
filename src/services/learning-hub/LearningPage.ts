export class LearningPage {
    id:string;
    title:string;
    description: string;
    orderId: number;
    videoSource:string;
    constructor(id:string, title:string, description:string, orderId:number, videoSource:string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.orderId = orderId;
        this.videoSource = videoSource;
    }

}