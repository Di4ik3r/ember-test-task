import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BreadCrumbsComponent extends Component {

	@service router

	get activeURL() {
		let currentRoute = ""
		for(let i = 1; i < this.router.currentURL.length; i++) {
			currentRoute += this.router.currentURL[i]
		}
		const array = currentRoute.split("/")
		let result = ["home"]
		if(array[0] == "") {
			return result
		}
		for(let route of array) {
			if(Number(route)) {
				result.push("post " + route) 
			} else {
				result.push(route)
			}
		}
		return result
	}

	get activeRoute() {
		const routes = `${this.router.currentRouteName}`.split(".")
		const result = []
		let indexer = 1
		for(let elemnt of routes) {
			let buff = []
			for(let i = 0; i < indexer; i++) {
				buff.push(routes[i])
			}
			if(!buff.includes("index")) {
				result.push({
					route: buff.join("."),
					alias: buff[buff.length - 1]
				})
			}
			indexer += 1
		}
		return result
	}
}
