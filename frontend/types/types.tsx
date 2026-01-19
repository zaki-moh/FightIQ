type ExplanationFactor = {
  type:
    | 'grapple_eff_diff'
    | 'strike_eff_diff'
    | 'win_ratio_diff'
    | 'performance_diff'
    | 'reach_diff'
    | 'height_diff'
    | 'age_diff'
  description: string
  importance: number
  advantage: number
}

type PredictionExplanation = {
  summary: string
  factors: ExplanationFactor[]
}
