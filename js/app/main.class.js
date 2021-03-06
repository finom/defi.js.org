// legacy code starts there
import g from './globals';
import MatreshkaObject from 'matreshka/object';
import $ from 'balajs';
import Articles from './articles.class';
import Typedefs from './typedefs.class';
import Notifier from './notifier.class';
import Search from './search.class';
import headerHider from '../lib/header-hider';
import hljs from 'highlight.js';
import { className, html, dataset, display } from 'matreshka/binders';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class Main extends MatreshkaObject {
	constructor() {
		g.app = super();

		this
			.bindings()
			.events()
			.set({
				view: localStorage.view || 'all',
				isMobile: /mobile|android/i.test(navigator.userAgent),
			})
			.instantiate({
				notifier: Notifier,
				search: Search,
				articles: Articles,
				typedefs: Typedefs,
			});

		if (location.hash) {
			// looks stupid but it forces chrome correctly work with :target selector
			location.href = location.href;
		}

		// move to the hashbang url structure
		if (/#\w.*/.test(location.hash) && $(`[id="!${location.hash.replace('#', '')}"]`).length) {
			location.hash = '!' + location.hash.replace('#', '');
		}

		location.hash = location.hash || '!home';

		if (~location.hash.indexOf('comments')) {
			 // #!/matreshka/comments/matreshka-ru%23matreshka::unread
			 // #!/matreshka/comments/matreshka-ru:matreshka-bindnode::unread
			var threadID = location.hash.replace(/#!\/matreshka\/comments\/matreshka-\S{2}(?:%23|:)(.*)::unread/, '$1').toLowerCase(),
				commentArticle,
				commentsContainer;

			for (var i = 0; i < this.articles.length; i++) {
				if (~this.articles[i].id.toLowerCase().replace(/\./g, '').indexOf(threadID)) {
					commentArticle = this.articles[i];
					commentsContainer = commentArticle.bound('commentsContainer');
					break;
				}
			}

			if (commentArticle && commentsContainer) {
				location.hash = commentArticle.id;
				commentsContainer.classList.add('muut');
				commentArticle.commentsShown = true;
				this.muut();
			}
		}



		// have no time to make it work in tamplete, so let's shitcode!
		for(let a of $('a')) {
			let href = a.getAttribute('href');
			if(href && ~href.indexOf('//')) {
				a.target = '_blank';
			}
		}



		this.initDynamicStyles();

		for(let block of $('code.lang-js, code.lang-html, code.language-js, code.language-html, re.prettyprint.source')) {
			hljs.highlightBlock(block);
		}

		this.loading = false;

		if(location.hash == '#!home') {
			setTimeout(() => {
				let el = document.querySelector('.demo .in');
				el.focus();
				el.selectionStart = el.selectionEnd = el.value.length;
			});
		}
	}

	initDynamicStyles() {
		let styleSheet = document.styleSheets[0];

		styleSheet.insertRule(`
			body[data-importance-level="1"] [data-importance="2"],
			body[data-importance-level="1"] [data-importance="3"],
			body[data-importance-level="2"] [data-importance="3"] {
				display: none;
			}`, styleSheet.cssRules.length);

		return this;
	}

	bindings() {
		return this
			.bindNode('demoProp', '.demo .in, .demo .out')
			.bindNode({sandbox: 'body',})
			.bindNode({

				win: window,
				viewSwitcher: 'nav .view-switcher',
				navShown: {
					node: 'body',
					binder: className('nav-shown')
				},
				isMobile: {
					node: ':sandbox',
					binder: className('mobile')
				},
				loading: {
					node: '.loader',
					binder: className('hide', false)
				},
				navOverlay: {
					node: '.nav-overlay',
					binder: className('hide', false)
				},
				htmlTitle: {
					node: 'head title',
					binder: html()
				},
				hashValue: [{
					node: window,
					binder: {
						on: 'hashchange',
						getValue: function() {
							return location.hash.replace('#', '');
						}
					}
				}],
				mainTitle: {
					node: 'title',
					binder: {
						getValue: function() {
							return this.innerHTML;
						}
					}
				},
				view: {
					node: 'body',
					binder: dataset('view')
				},
			})
			.bindNode({
				view: ':bound(viewSwitcher)'
			}, {
				on: 'click',
				getValue: function() {
					return this.querySelector('.checked').getAttribute('data-value');
				},
				setValue: function(v) {
					$(this.children).forEach(function(item) {
						item.classList.toggle('checked', item.getAttribute('data-value') === v);
					});
				},
				initialize: function() {
					this.addEventListener('mousedown', function(evt) {
						if (evt.target !== this) $(this.children).forEach(function(item) {
							item.classList.toggle('checked', evt.target === item);
						});
					});
				}
			});
	}

	events() {
		return this
			.onDebounce('scroll::win', function() {
				if (this.view === 'all') {
					var fromTop = window.pageYOffset,
						fromLeft = window.pageXOffset,
						cur = this.articles.filter(article => {
							let el = article.nodes.sandbox;
							return (el.offsetTop < fromTop + 50
								&& el.offsetWidth > 0 && el.offsetHeight > 0);
						}),
						hash;

					cur = cur[cur.length - 1];

					hash = cur ? cur.id : "";

					if (this.hashValue != hash) {
						this.hashValue = hash;
						if (window.history && history.pushState) {
							history.pushState(null, null, '#' + hash);
						} else {
							location.hash = hash;
							scrollTo(fromLeft, fromTop);
						}
					}
				}
			}, 200)
			.on({
				'change:view': evt => {
					if(!this.articles) return;
					var fromLeft = window.pageXOffset,
						fromTop;

					localStorage.view = this.view;

					if (this.view === 'all') {
						fromTop = this.articles.active ? this.articles.active.nodes.sandbox.offsetTop : 0;
					} else {
						fromTop = 0;
					}

					scrollTo(fromLeft, fromTop);
				},
				'click::(.show-nav)': evt => {
					this.navOverlay = true;

					setTimeout(() => {
						this.navShown = true;
					});
				},
				'click::navOverlay': evt => {
					this.once('transitionend::navOverlay', evt => this.navOverlay = false);
					this.navShown = false;
				},
			});
	}

	muut() {
		var script;
		if (typeof jQuery === 'undefined' || !jQuery.fn.muut) {
			document.body.appendChild(document.createElement('script')).src = '//cdn.muut.com/1/moot.min.js';
		} else {
			jQuery('.muut').muut();
		}
	}
}
