import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NewsComponent extends Component {
	@tracked posts

	constructor() {
		super(...arguments)
		this.category = this.args.category
		this.subcategory = this.args.subcategory

		if (this.subcategory) {
			fetch(`http://localhost:3001/${this.category}/${this.subcategory}`)
			.then(response => response.json())
			.then(data => {
				this.posts = data
				this.posts.sort((a, b) => {
					const dateA = new Date(a.post.date)
					const dateB = new Date(b.post.date)
					return -(dateA - dateB)
				})
			})
		} else {
			fetch(`http://localhost:3001/${this.category}`)
			.then(response => response.json())
			.then(data => {
				this.posts = data
				this.posts.sort((a, b) => {
					const dateA = new Date(a.post.date)
					const dateB = new Date(b.post.date)
					return -(dateA - dateB)
				})
				// console.log(this.posts)
			})
		}
	}
}
