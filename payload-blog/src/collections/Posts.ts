import type { HTMLConvertersFunction } from '@payloadcms/richtext-lexical/html'
import { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  type DefaultNodeTypes,
  lexicalEditor,
  lexicalHTMLField,
  type SerializedBlockNode,
} from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
