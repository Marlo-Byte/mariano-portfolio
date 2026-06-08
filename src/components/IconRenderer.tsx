import * as Icons from 'lucide-react'

interface IconRendererProps {
  name: string
  className?: string
  size?: number
}

export function IconRenderer({ name, className, size = 24 }: IconRendererProps) {
  const LucideIcon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name] || Icons.Code
  return <LucideIcon className={className} size={size} />
}
