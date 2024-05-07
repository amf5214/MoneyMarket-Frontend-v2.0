export class Profile {
    name:string;
    age:number;
    bio:string;
    experience:string;
    citystate:string;
    education:string;
    email:string;
    authAccountId:number;

    constructor(name:string, age:number, bio:string, experience:string, citystate:string, education:string, email:string, authAccountId:number) {
        this.name = name;
        this.age = age;
        this.bio = bio;
        this.experience = experience;
        this.citystate = citystate;
        this.education = education;
        this.email = email;
        this.authAccountId = authAccountId;
    }
}