import React from 'react'

const page = () => {

  return (
    <main className="flex flex-col w-full items-center">
        <section className="mt-16 max-w-3xl px-6 text-left"> 
            <h1 className="text-white text-4xl font-semibold leading-tight">
                How the FightIQ Model Predicts Fight Outcomes
            </h1>
            <p className="mt-4 leading-relaxed text-white/60 text-lg">
                This page provides a detailed breakdown of the machine learning model
                behind FightIQ, including how data is processed, how predictions are
                generated, and how accuracy is evaluated.
            </p>
        </section>

        <div className="my-16 w-full h-px bg-white/10"/>

        <section className="max-w-3xl px-6 w-full text-left">
            <h2 className="leading-snug text-2xl font-semibold text-white">
                Problem Formulation
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed text-lg">
                At a high level, the model is trained to predict the probability of
                a fighter winning a given matchup based on historical fight data
                and fighter-level statistics.
            </p>
            <h3 className="mt-8 font-semibold leading-snug text-white text-xl">
                Prediction Target
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                The model outputs a probability for each fighter in a matchup. The predicted
                outcome is determined by selecting the fighter with the higher predicted
                win probability, which represents the model’s belief about which fighter is
                more likely to win given the available pre-fight information.
            </p>

            <h3 className="mt-8 font-semibold leading-snug text-white text-xl">
                  Available Information at Prediction Time
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                At prediction time, the model only has access to information that would be
                known prior to the fight. This includes historical fight outcomes, fighter-level
                performance statistics, and aggregated metrics derived from past bouts. No
                post-fight data or future information is used, ensuring that predictions are
                generated under realistic, pre-fight conditions and avoiding data leakage.
            </p>

            
            <h3 className="mt-8 font-semibold leading-snug text-white text-xl">
                Definition of a Training Example
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Each training example represents a single fight matchup between two fighters
                prior to the bout taking place. The input features consist of aggregated
                statistics for both fighters, such as historical performance metrics and
                recent fight data, combined into a matchup-level representation. The target
                label corresponds to the observed outcome of the fight, indicating which
                fighter ultimately won.
            </p>

            <h3 className="mt-8 font-semibold leading-snug text-white text-xl">
                Assumptions and Scope
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                The model operates under the assumption that historical performance and
                fighter-level statistics capture a meaningful signal about future fight
                outcomes. It does not explicitly account for factors such as injuries,
                last-minute fight changes, training camp quality, weight cut conditions,
                or in-fight dynamics that are difficult to quantify reliably. As a result,
                predictions should be interpreted as probabilistic assessments based on
                available pre-fight data rather than definitive guarantees.
            </p>
        </section>

        <div className="my-16 h-px w-full bg-white/10"/>

        <section className="max-w-3xl px-6 w-full text-left"> 
            <h2 className="text-2xl font-semibold leading-snug text-white">
                Data Sources and Feature Engineering
            </h2>
            <p className="mt-4 leading-relaxed text-lg text-white/60">
                This section describes the data sources used to train the model and the
                feature engineering process that transforms raw fight records into
                structured inputs suitable for learning. It outlines the types of data
                incorporated, how fighter-level statistics are aggregated over time, and
                the design choices made to ensure features reflect only information
                available prior to each fight.
            </p>

            <h3 className="text-xl font-semibold text-white leading-snug mt-8">
                Feature Categories
            </h3>
            <p className="mt-4 leading-relaxed text-white/60 text-lg">
                Features are organized into several high-level categories designed to capture
                both individual fighter attributes and comparative matchup information.
                Fighter-level features include physical characteristics (such as height and
                reach), career statistics (wins, losses, and fight history), and performance
                metrics derived from historical bouts. These attributes are combined across
                both fighters in a matchup to form a comparative representation, allowing the
                model to learn relative advantages rather than absolute values. All features
                are numeric and constructed to reflect information available prior to the
                fight.
            </p>

            <h3 className="text-xl font-semibold text-white leading-snug mt-8">
                Aggregation and Temporal Handling
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                To account for changes in fighter performance over time, raw fight-level data
                is aggregated into summary statistics that reflect a fighter’s history prior
                to each matchup. Metrics are computed using only bouts that occurred before
                the target fight, ensuring temporal consistency. Where applicable, features
                emphasize recent performance trends alongside longer-term career statistics,
                allowing the model to balance short-term form with overall experience while
                avoiding the inclusion of future information.
            </p>

            <h3 className="text-xl font-semibold text-white leading-snug mt-8">
                Data Cleaning and Preprocessing
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Prior to training, the dataset undergoes a preprocessing step to ensure
                consistency and numerical stability. Incomplete or invalid records are
                filtered out, and missing values are handled using simple, rule-based
                imputation where appropriate. Features are converted into a standardized
                numeric format suitable for model input, with preprocessing choices designed
                to preserve relative differences between fighters rather than absolute scale.
            </p>
        </section>

        <div className="my-16 h-px w-full bg-white/10"/>

        <section className="px-6 max-w-3xl w-full text-left">
            <h2 className="text-2xl font-semibold leading-snug text-white">
                Model Architecture and Training Procedure
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                This section describes the machine learning model used to generate predictions
                and the training procedure applied to fit it to historical fight data. It
                outlines the model architecture, the rationale behind its selection, and the
                steps taken during training to ensure stable learning and generalization to
                unseen matchups.
            </p>

            <h3 className="text-xl font-semibold text-white leading-snug mt-8">
                Training Objective and Loss Function
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                The model is trained to minimize a classification loss function that penalizes
                incorrect probability estimates with respect to the observed fight outcomes.
                By optimizing a probabilistic objective, the training process encourages the
                model to produce well-calibrated win probabilities rather than only hard class
                predictions. This aligns the training objective directly with the intended use
                of the model as a probabilistic decision-making tool.
            </p>

            <h3 className="text-xl font-semibold text-white leading-snug mt-8">
                Training Procedure
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Model training is performed using historical fight matchups constructed from
                pre-fight data only. The dataset is split into training and evaluation subsets
                based on fight chronology to preserve temporal integrity. During training, the
                model iteratively adjusts its parameters to minimize the chosen loss function,
                with regularization and early stopping applied where appropriate to reduce
                overfitting and improve generalization to unseen matchups.
            </p>

            <h3 className="text-xl font-semibold text-white leading-snug mt-8">
                Hyperparameter Selection
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Hyperparameters are selected through a combination of prior domain knowledge
                and empirical evaluation on held-out validation data. Rather than exhaustively
                tuning for marginal gains, emphasis is placed on selecting stable configurations
                that balance bias and variance. This approach helps ensure consistent
                performance across different subsets of data and reduces sensitivity to noise
                in the training set.
            </p>       
        </section>

        <div className="my-16 h-px w-full bg-white/10"/>

        <section className="px-6 max-w-3xl w-full text-left">
            <h2 className="text-2xl font-semibold leading-snug text-white">
                  Evaluation Methodology and Metrics
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                This section describes how the model’s performance is evaluated and how
                predictive accuracy is measured. It outlines the data splitting strategy,
                the evaluation metrics used, and the rationale behind these choices to ensure
                reported results reflect realistic, out-of-sample performance.
            </p>
            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
            Train–Test Split Strategy
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                To evaluate performance under realistic conditions, the dataset is split into
                training and test sets based on fight chronology rather than random sampling.
                All fights used for evaluation occur strictly after those used for training,
                ensuring the model is tested only on future, unseen matchups. This approach
                preserves temporal integrity and prevents information leakage that could
                artificially inflate reported performance.
            </p>
            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
            Evaluation Metrics
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Model performance is evaluated using standard classification metrics that
                reflect both predictive accuracy and probabilistic quality. Overall accuracy
                is reported to measure how often the model correctly identifies the winning
                fighter, while probability-based metrics are used to assess the reliability of
                predicted confidence levels. Together, these metrics provide a balanced view
                of performance beyond a single summary statistic.
            </p>
            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
            Interpretation of Results
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Reported performance metrics should be interpreted as estimates of the model’s
                ability to generalize to future fights rather than guarantees of individual
                outcomes. While the model demonstrates predictive skill above baseline
                expectations, uncertainty remains inherent in fight outcomes due to
                unmodeled factors and stochastic variation. As such, predictions are best
                viewed as informed probabilistic assessments rather than deterministic
                forecasts.
            </p>
        </section>

        <div className="my-16 h-px w-full bg-white/10"/>

        <section className="px-6 w-full max-w-3xl text-left">
            <h2 className="text-2xl font-semibold leading-snug text-white">
                Calibration and Prediction Confidence
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Because the model produces probabilistic predictions rather than binary
                outcomes, it is important to understand how these probabilities should be
                interpreted. This section explains the concept of calibration, how prediction
                confidence is assessed, and how users should reason about the model’s output
                in practice.
            </p>
            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
                Probability Calibration
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Probability calibration refers to how closely the model’s predicted
                probabilities align with observed outcomes. A well-calibrated model assigns
                probabilities such that, over many predictions, events predicted with a given
                confidence occur at approximately that rate. Calibration is particularly
                important for decision-making tasks, as it ensures that predicted confidence
                levels meaningfully reflect real-world uncertainty rather than overconfidence
                or underconfidence.
            </p>

            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
                Interpreting Prediction Confidence
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                A predicted win probability represents the model’s confidence given the
                available pre-fight information, not a guaranteed outcome. For example, a
                prediction of 70% indicates that, across similar matchups, the favored fighter
                would be expected to win approximately seven out of ten times. Individual
                fights remain inherently uncertain, and lower-confidence predictions should
                be interpreted as closer matchups rather than errors.
            </p>

            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
                Practical Use of Probabilities
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                In practice, predicted probabilities are most useful when considered in
                aggregate rather than as isolated forecasts. Higher-confidence predictions
                generally indicate clearer statistical advantages, while predictions near
                50% reflect evenly matched fights. Users are encouraged to treat probabilities
                as guidance for relative confidence and risk assessment rather than definitive
                predictions of fight outcomes.
            </p>
        </section>

        <div className="my-16 h-px w-full bg-white/10"/>

        <section className="px-6 w-full max-w-3xl text-left">
            <h2 className="text-2xl font-semibold leading-snug text-white">
                Limitations and Known Constraints
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                While the model demonstrates predictive skill on historical data, it operates
                under several important limitations. This section outlines known constraints
                related to data coverage, modeling assumptions, and unobserved factors that
                may affect predictive performance in real-world scenarios.
            </p>

            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
                Data Coverage and Recency
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                The model is trained on historical fight data available through the end of the
                2021 season. As a result, predictions may be less reliable for fighters whose
                skill level, style, or competitive context has changed significantly since
                that time. Ongoing updates to the dataset would be required to fully capture
                recent trends, evolving training methods, and changes in the competitive
                landscape.
            </p>

            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
                Unmodeled Factors
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Certain factors that can influence fight outcomes are difficult to quantify
                reliably and are not explicitly modeled. These include injuries, short-notice
                fight changes, training camp quality, weight cut conditions, and in-fight
                dynamics. Because such information is either unavailable or inconsistent prior
                to a fight, the model relies solely on historical and statistical signals.
            </p>

            <h3 className="mt-8 text-xl font-semibold leading-snug text-white">
                Probabilistic Uncertainty
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Even with well-calibrated probabilities, fight outcomes remain inherently
                uncertain due to randomness and unobserved variables. Close matchups, in
                particular, may result in outcomes that differ from the model’s highest-probability
                prediction. As such, the model’s outputs should be interpreted as probabilistic
                guidance rather than definitive predictions.
            </p>
        </section>

        <div className="my-16 h-px w-full bg-white/10"/>
        
        <section className="px-6 w-full max-w-3xl text-left"> 
            <h2 className="text-2xl font-semibold leading-snug text-white">
                Future Improvements
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
                Several extensions could further improve the model’s accuracy, robustness, and
                applicability. Potential improvements include incorporating more recent fight
                data to capture evolving fighter performance, exploring additional features
                related to matchup dynamics, and experimenting with alternative model
                architectures better suited to complex non-linear interactions. Additional
                work could also focus on refining probability calibration and expanding
                evaluation across different promotions and weight classes.
            </p>
                    
            <ul className="mt-4 space-y-2 list-disc list-inside text-white/60 text-lg mb-24">
                <li>Regularly updating the dataset to include recent fights and emerging fighters.</li>
                <li>Incorporating richer matchup-level features and stylistic indicators.</li>
                <li>Exploring alternative model architectures and ensemble approaches.</li>
                <li>Improving probability calibration and uncertainty estimation.</li>
            </ul>
        </section>
    </main>
  )
}

export default page