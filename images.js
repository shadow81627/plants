const { resolve } = require('path')
const { promises } = require('fs')
const head = require('lodash/head')
const shuffle = require('lodash/shuffle')
const sharp = require('sharp')
const { readdir } = promises

/**
 * https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
 * @param {String} dir
 */
async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

;(async () => {
  const filenames = []
  const folder = 'assets/img/species'
  // get list of urls to crawl from content files
  for await (const filename of getFiles(folder)) {
    filenames.push(filename)
    const buffer = await sharp(filename)
      .resize({ width: 4686, height: 2636 })
      .toBuffer()
    sharp(buffer).toFile(filename)
  }

  const cover = head(shuffle(filenames))

  sharp(cover).resize({ width: 1200, height: 600 }).toFile(`static/cover.jpg`)
})()
