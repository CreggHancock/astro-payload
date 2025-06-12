import { CollectionConfig } from 'payload'
import {
  lexicalHTMLField,
} from '@payloadcms/richtext-lexical'

export const PrivatePosts: CollectionConfig = {
  slug: 'private-posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req: { user },  }) => {
        return Boolean(user)
    }
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: 'post-categories',
      hasMany: true,
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    lexicalHTMLField({
      htmlFieldName: 'content_html',
      lexicalFieldName: 'content',
    }),
  ],
}
