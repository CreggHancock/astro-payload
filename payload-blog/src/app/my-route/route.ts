import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'users',
  })

  return Response.json(data)
}


export const GETPOSTS = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'posts',
  });
}
