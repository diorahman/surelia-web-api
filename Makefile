test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--harmony \
		--timeout 50000 \
		endpoints/surelia/test.js

.PHONY: test
