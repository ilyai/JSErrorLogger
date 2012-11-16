
build:
	@cat tracekit.js errorlogger.js | uglifyjs -nc > errorlogger.min.js
