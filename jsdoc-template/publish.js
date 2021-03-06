"use strict";
const fs = require('jsdoc/fs');
const outdir = env.opts.destination;
const template = require('jsdoc/template');
const mdParser = require('marked');
const localizations = require('./localizations');
const parseExample = require('./parse-example');
const resolveLinksRecursively = require('./resolve-links-recursively');
const getGithubSourceLink = require('./get-github-source-link');

module.exports.publish = function(data, opts) {
	const origData = data().get();
	const result = {
		namespaces: {},
		typedefs: [],
	};
	let variation = 0;

	origData.forEach(function(item, index) {
		if(item.kind === 'package') {
			return;
		}

		item.githubSourceLink = getGithubSourceLink(__dirname, item);

		delete item.meta;
		delete item.___id;
		delete item.___s;
		delete item.tags;

		if (item.kind == 'namespace') {
			result.namespaces[item.longname] = item;

			item.staticMembers = {
				member: [],
				function: []
			};
		}

		if (index && item.name === origData[index - 1].name) {
			variation++;
			origData[index - variation]
				&& (origData[index - variation].variations = origData[index - variation].variations || []).push(item);
		} else {
			variation = 0;
		}

		resolveLinksRecursively(item);

		if (item.kind === 'typedef') {
			result.typedefs.push(item);
			if(item.properties) {
				item.properties.forEach((property) => {
					property.description = mdParser(property.description);
				});
			}
		}

		item.see = item.see || [];
		item.properties = item.properties || [];

		item.description = item.description || item.classdesc || '';
		item.description = mdParser(item.description.replace(/&quot;/g, '"'));

		item.summary = item.summary ? mdParser(item.summary) : '';

		item.examples = item.examples ? item.examples.map(parseExample) : [];

		if(item.returns && item.returns.length) {
			const { description } = item.returns[0];
			item.returns[0].description = description ? mdParser(description) : ''
		}

		// getting rif od HTML
		item.summary_plain = item.summary ? item.summary.replace(/(<([^>]+)>)/ig, "") : '';
	});

	origData.forEach(function(item) {
		var _class,
			members;
		if (_class = result.namespaces[item.memberof]) {
			members = _class[item.scope + 'Members'] = _class[item.scope + 'Members'] || {};
			if (item.kind !== 'class') {
				(members[item.kind] = members[item.kind] || []).push(item);
				item.params = item.params || item.properties || [];
				item.params.forEach(function(item) {
					item.description = mdParser((item.description || '').replace(/&quot;/g, '"'));
				})
			}
		}
	});

	var templatePath = opts.template,
		view = new template.Template(templatePath + '/tmpl');

	fs.mkPath(outdir);

	view.lang = localizations.en;

	for(var className in result.namespaces) {
		var _class = result.namespaces[className];
		var sortFunction = function(a, b) {
			return a.longname < b.longname ? -1 : 1;
		};

		_class.staticMembers.member.sort(sortFunction);
		_class.staticMembers.function.sort(sortFunction);
	}

	fs.writeFileSync(env.opts.destination + '/doc_menu.html', view.render('menu.html', result), 'utf8');
	fs.writeFileSync(env.opts.destination + '/doc_content.html', view.render('content.html', result), 'utf8');
};
