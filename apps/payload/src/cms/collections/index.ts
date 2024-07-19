import { CollectionConfig, CollectionSlug } from 'payload'

export const users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    delete: () => false,
    update: () => false,
  },
  fields: [],
}

export const media: CollectionConfig = {
  slug: 'media',
  upload: true,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
}

export const tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}

export const posts: CollectionConfig = {
  slug: 'post',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'markdown-content',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Draft',
          value: 'draft',
        },
      ],
    },
    {
      name: 'post-tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
}
