import React from 'react'

const page = () => {
  return (
    <main className="flex flex-col w-full items-center">
      <section className="mt-16 max-w-3xl px-6 text-left">
        <h1 className="text-white text-4xl font-semibold leading-tight">
          How the FightIQ Model Predicts Fight Outcomes
        </h1>
        <p className="mt-4 leading-relaxed text-white/60 text-lg">
          This page explains how FightIQ generates fight predictions, including
          how matchup data is constructed, how the model is trained, and how
          predicted probabilities should be interpreted.
        </p>
      </section>

      <div className="my-16 w-full h-px bg-white/10" />

      <section className="max-w-3xl px-6 w-full text-left">
        <h2 className="leading-snug text-2xl font-semibold text-white">
          Problem Formulation
        </h2>

        <p className="mt-4 text-white/60 leading-relaxed text-lg">
          FightIQ frames fight prediction as a probabilistic classification
          problem. Given two fighters and their pre-fight statistics, the model
          estimates the likelihood that each fighter wins the matchup.
        </p>

        <h3 className="mt-8 font-semibold text-white text-xl">
          Prediction Target
        </h3>

        <p className="mt-4 text-lg leading-relaxed text-white/60">
          For a given matchup, the model outputs a win probability for each
          fighter. The predicted winner is the fighter with the higher
          probability, while the probability value represents relative model
          confidence based on historical patterns.
        </p>

        <h3 className="mt-8 font-semibold text-white text-xl">
          Information Available at Prediction Time
        </h3>

        <p className="mt-4 text-lg leading-relaxed text-white/60">
          All predictions are generated using information that would be known
          prior to the fight. This includes historical fight outcomes and
          aggregated fighter-level statistics. No post-fight data or future
          information is used.
        </p>

        <h3 className="mt-8 font-semibold text-white text-xl">
          Scope and Assumptions
        </h3>

        <p className="mt-4 text-lg leading-relaxed text-white/60">
          The model assumes that historical performance metrics capture useful
          signal about future outcomes. It does not account for unobservable or
          late-breaking factors such as injuries, short-notice changes, or
          training camp conditions.
        </p>
      </section>

      <div className="my-16 h-px w-full bg-white/10" />

      <section className="max-w-3xl px-6 w-full text-left">
        <h2 className="text-2xl font-semibold text-white">
          Data Sources and Feature Engineering
        </h2>

        <p className="mt-4 text-lg text-white/60 leading-relaxed">
          The model is trained on historical fight data and fighter-level
          statistics. Raw records are transformed into numeric features that
          describe each fighter and the relative differences between them.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8">
          Feature Construction
        </h3>

        <p className="mt-4 text-white/60 text-lg leading-relaxed">
          Features include physical attributes, win ratios, and efficiency-style
          metrics derived from past fights. For prediction, fighter A and fighter
          B statistics are combined into difference-based features that reflect
          matchup advantages rather than absolute values.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8">
          Preprocessing
        </h3>

        <p className="mt-4 text-lg text-white/60 leading-relaxed">
          Features are standardized prior to training to ensure consistent scale.
          Missing or invalid entries are handled through simple preprocessing
          rules to maintain numerical stability.
        </p>
      </section>

      <div className="my-16 h-px w-full bg-white/10" />

      <section className="px-6 max-w-3xl w-full text-left">
        <h2 className="text-2xl font-semibold text-white">
          Model Architecture and Training
        </h2>

        <p className="mt-4 text-lg text-white/60 leading-relaxed">
          FightIQ uses a supervised machine learning classifier trained on
          historical matchup data. The model learns patterns that associate
          feature differences with fight outcomes.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8">
          Training Procedure
        </h3>

        <p className="mt-4 text-lg text-white/60 leading-relaxed">
          Training data consists of matchups constructed chronologically from
          historical fights. Model parameters are fit using only past data, and
          evaluation is performed on later fights to reflect real-world
          deployment conditions.
        </p>
      </section>

      <div className="my-16 h-px w-full bg-white/10" />

      <section className="px-6 max-w-3xl w-full text-left">
        <h2 className="text-2xl font-semibold text-white">
          Evaluation and Interpretation
        </h2>

        <p className="mt-4 text-lg text-white/60 leading-relaxed">
          Model performance is evaluated on held-out historical fights that were
          not used during training. Accuracy reflects how often the model
          correctly identifies the winner across these unseen matchups.
        </p>

        <p className="mt-4 text-lg text-white/60 leading-relaxed">
          Because the model outputs probabilities, predictions should be
          interpreted probabilistically rather than as guarantees. A 70%
          prediction indicates stronger statistical support, not certainty.
        </p>
      </section>

      <div className="my-16 h-px w-full bg-white/10" />

      <section className="px-6 max-w-3xl w-full text-left">
        <h2 className="text-2xl font-semibold text-white">
          Limitations
        </h2>

        <p className="mt-4 text-lg text-white/60 leading-relaxed">
          The current model is trained on fight data available through the end
          of 2021. Predictions for fighters whose styles or performance have
          changed significantly since then may be less reliable.
        </p>

        <p className="mt-4 text-lg text-white/60 leading-relaxed">
          Fight outcomes are inherently uncertain. The model does not capture
          all contextual factors, and close matchups may reasonably produce
          unexpected results.
        </p>
      </section>

      <div className="my-16 h-px w-full bg-white/10" />

      <section className="px-6 max-w-3xl w-full text-left mb-24">
        <h2 className="text-2xl font-semibold text-white">
          Future Improvements
        </h2>

        <ul className="mt-4 space-y-2 list-disc list-inside text-white/60 text-lg">
          <li>Updating training data with more recent fights</li>
          <li>Adding richer stylistic and matchup-level features</li>
          <li>Improving probability calibration techniques</li>
          <li>Expanding support beyond UFC to additional promotions</li>
        </ul>
      </section>
    </main>
  )
}

export default page
