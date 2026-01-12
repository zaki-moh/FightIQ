import React from 'react'

const PrivacyPage = () => {
  return (
    <main className="min-h-screen text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-white/60">
          Last updated: January 2026
        </p>

        <p className="mt-6 text-sm text-white/70 leading-relaxed">
          FightIQ respects your privacy and is committed to being transparent
          about how information is handled. This page explains what data is
          collected and how it is used when you interact with the platform.
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-medium">
            Information We Collect
          </h2>

          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            FightIQ does not require user accounts and does not collect
            personally identifiable information such as names, email addresses,
            or payment details.
          </p>

          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Basic technical information (such as request metadata or logs) may
            be temporarily processed to ensure system reliability and
            performance.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">
            How Information Is Used
          </h2>

          <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc list-inside">
            <li>Operate and maintain the FightIQ platform</li>
            <li>Improve model performance and user experience</li>
            <li>Monitor usage for reliability and security</li>
          </ul>
        </section>

        <div className="mt-10 border-t border-white/10" />

        <section className="mt-10">
          <h2 className="text-lg font-medium">
            Third-Party Services
          </h2>

          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            FightIQ may use third-party infrastructure providers for hosting
            and deployment. These services process data only as necessary to
            provide the platform and are subject to their own privacy policies.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">
            Data Retention
          </h2>

          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            FightIQ does not retain personal user data. Any temporary technical
            data used for system operation is discarded in accordance with
            standard operational practices.
          </p>
        </section>

        <div className="mt-10 border-t border-white/10" />

        <section className="mt-10">
          <h2 className="text-lg font-medium">
            Changes to This Policy
          </h2>

          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            This Privacy Policy may be updated periodically to reflect changes
            to the platform. Updates will be posted on this page.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">
            Contact
          </h2>

          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            If you have questions about this Privacy Policy, you can contact
            the FightIQ team at{" "}
            <a
              href="mailto:zakaria.mohamed.mn@gmail.com"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              zakaria.mohamed.mn@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  )
}

export default PrivacyPage
