import { Swords, GitBranch, Scale, Minus } from 'lucide-react'
import { LucideIcon } from 'lucide-react'


type EdgeType = "striking" | "grappling" | "no_clear_advantage" | "weight"

export const EDGE_LABELS = {
  striking: "Edge in striking",
  grappling: "Edge in grappling",
  no_clear_advantage: "No clear stylistic advantage",
  weight: "Significant weight advantage",
}

export const EDGE_CONTEXT = {
  striking: "Striking",
  grappling: "Grappling",
  no_clear_advantage: "No clear advantage", 
  weight: "Weight",
}

export const EDGE_ICON: Record<EdgeType, LucideIcon> = {
  striking: Swords,
  grappling: GitBranch,
  weight: Scale,
  no_clear_advantage: Minus,
}
