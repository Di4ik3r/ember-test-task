import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('news', function() {
    this.route('index', {path: '/'});
    this.route('business', function() {
      this.route('index', {path: '/'})
      this.route('post', {path: '/:id'});
    });
    this.route('culture', function() {
      this.route('index', {path: '/'})
      this.route('post', {path: '/:id'});
    });
    this.route('design', function() {
      this.route('index', {path: '/'})
      this.route('post', {path: '/:id'});
    });
  });
  this.route('blogs', function() {
    this.route('index', {path: '/'});
    this.route('social', function() {
      this.route('index', {path: '/'})
      this.route('post', {path: '/:id'});
    });
    this.route('startups', function() {
      this.route('post', {path: '/:id'});
    });
  });
  this.route('forums', function() {
    this.route('index', {path: '/'});
    this.route('ideas', function() {
      this.route('index', {path: '/'})
      this.route('post', {path: '/:id'});
    });
    this.route('technologies', function() {
      this.route('index', {path: '/'})
      this.route('post', {path: '/:id'});
    });
    this.route('startups', function() {
      this.route('index', {path: '/'})
      this.route('post', {path: '/:id'});
    });
  });
});
