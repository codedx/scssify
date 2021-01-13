'use strict'
/* eslint-env mocha */
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const scssify = require('../lib')

it('emits "file" events for @imports', function (done) {
  const entry = __dirname + '/util/imports.scss'
  const expectedImport = __dirname + '/util/_vars.scss'
  fs.createReadStream(entry)
  .on('error', done)
  .pipe(scssify(entry, {_flags: {}}))
  .on('error', done)
  .on('file', function (imported) {
    assert.equal(path.normalize(imported), path.normalize(expectedImport))
  })
  .on('end', done)
  .resume()
})
