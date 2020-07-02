import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class NavComponent extends Component {
	@tracked categories

	constructor() {
		super(...arguments)

		fetch('http://localhost:3001/')
		.then(response => response.json())
		.then(data => {
			this.categories = data
		})
	}
}
