import { ObjectId } from 'mongodb'

export class LearningSeries {
    _id:string;
    authorName:string;
    authorUserId:number;
    title:string;
    coverArtId:string;
    description: string;
    constructor(_id:ObjectId, authorName:string, authorUserId:number, title:string, coverArtId:string, description:string) {
        this._id = _id.toString();
        this.authorName = authorName;
        this.authorUserId = authorUserId;
        this.title = title;
        this.coverArtId = coverArtId;
        this.description = description;
    }

}