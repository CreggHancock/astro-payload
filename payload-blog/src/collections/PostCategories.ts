import { CollectionConfig } from 'payload'

export const PostCategories: CollectionConfig = {
  slug: 'post-categories',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
  }
}
