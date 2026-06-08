import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-08',
  useCdn: false, // Set to false for ISR/SSR and fresher data
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0] | null | undefined) {
  // If no source is passed, or if we have placeholder projectId, return a fallback string
  if (!source || projectId === 'placeholder' || (typeof source === 'object' && source !== null && !('asset' in source))) {
    return {
      url: () => '',
    }
  }
  return builder.image(source)
}

export function getFileUrl(source: { asset: { _ref: string } } | null | undefined) {
  if (!source || projectId === 'placeholder' || !source.asset || !source.asset._ref) {
    return ''
  }

  // Format of ref: file-c0e816a75f0a28f73187c2fb8ad8a99478f7e849-pdf
  const ref = source.asset._ref
  const parts = ref.split('-')
  const fileId = parts[1]
  const extension = parts[2]

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`
}
