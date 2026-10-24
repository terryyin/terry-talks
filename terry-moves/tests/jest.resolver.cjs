module.exports = (request, options) => {
	// @remotion/media exposes only an import entry; Node 24.9+ can require its ESM.
	// Keep other packages on Jest's normal CommonJS resolution conditions.
	if (request === '@remotion/media') {
		return options.defaultResolver(request, {
			...options,
			conditions: [...(options.conditions ?? []), 'import'],
		});
	}
	return options.defaultResolver(request, options);
};
