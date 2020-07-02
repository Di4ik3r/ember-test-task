import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PostSingleComponent extends Component {

	@tracked post

	constructor() {
		super(...arguments)
		console.log("asdjkladklasdjaslkdjaskld")
		this.id = this.args.model.id
		this.category = this.args.category
		this.subcategory = this.args.subcategory

		const query = `http://localhost:3001/${this.category}/${this.subcategory}/${this.id}`
		console.log(query)
		fetch(query)
		.then(response => response.json())
		.then(data => {
			this.post = data
			// console.log(this.post)
		})		
	}
}
