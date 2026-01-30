# tick-counter

A small demonstration of a JavaScript library providing an interface to a simple
[web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).
The web workers purpose is simply increasing a value each second.

## Features

* a common core providing used by any worker implementation providing a worker protocol
* an adapter to be used in browser context
* an adapter to be used in CLI/node context

It is far away from being complete, it still takes some effort to use this
library in any project, see the demo implementations in the
[browser demo](https://github.com/hidden-primary-net/js-tick-demo-02-browser-demo)
and the [CLI demo](https://github.com/hidden-primary-net/js-tick-demo-03-cli-demo).

## Build

```sh
npm run build
```
