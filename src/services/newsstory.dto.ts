export class NewsStory {
	title:string;
	description:string;
	url:string;
	image_url:string;
	constructor(data:any) {
		this.title = data['title'];
		this.description = data['description'];
		this.url = data['url'];
		this.image_url = data['image_url'];
	}
}