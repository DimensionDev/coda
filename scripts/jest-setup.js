// If don't delete those, elliptic will not work well
require = require('esm')(module)

Object.assign(globalThis, require('@sinonjs/text-encoding/index'))
