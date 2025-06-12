// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { PrivatePosts } from './collections/PrivatePosts';
import { Media } from './collections/Media'
import { PostCategories } from './collections/PostCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      header : [],
      beforeDashboard: [],
      afterDashboard: [],
      actions: [ '/components/CoreHeader.tsx'],
      afterNavLinks: ['/components/HelpDesk.tsx'],
      graphics: {
        Logo: '/components/Logo',
        Icon: '/components/Logo'
      },
    },
  },
  collections: [Users, Posts, Media, PostCategories, PrivatePosts ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder-
  ],
  cors: ["http://localhost:4322"]
})
