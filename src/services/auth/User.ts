export class User {
    id:number;
    createdAt:Date;
    updatedAt:Date;
    firstName:string;
    lastName:string;
    username:string;
    authAccountId:number;
    constructor(id:number, createdAt:Date, updatedAt:Date, firstName:string, lastName:string, username:string, authAccountId:number) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.authAccountId = authAccountId;
    }
}