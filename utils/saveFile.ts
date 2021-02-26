import { promises as fsPromises } from 'fs'
// import { startCase } from 'lodash-es'
import slugify from 'slugify'
import deepSort from './deepSort'
const { mkdir, writeFile } = fsPromises

interface saveFileArgs {
  id: string
  folder: string
  item: any
}

export async function saveFile({ id, folder, item }: saveFileArgs) {
  const slug = `${slugify(id, {
    lower: true,
    strict: true,
  })}`
  await mkdir(folder, { recursive: true })
  await writeFile(
    `${folder}/${slug}.json`,
    JSON.stringify(deepSort(item), undefined, 2) + '\n'
  )
}
