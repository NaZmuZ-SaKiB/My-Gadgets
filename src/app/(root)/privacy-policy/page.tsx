const PrivacyPolicyPage = () => {
  return (
    <div className="mg-container py-5 md:py-10">
      <div className="rounded-xl px-2 md:border md:p-8">
        <h1 className="mb-6 text-3xl font-bold text-slate-700">
          Privacy Policy
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Introduction
          </h2>
          <p className="mb-4 text-slate-700">
            At <span className="font-semibold">My Gadgets</span>, we are
            committed to protecting your privacy and ensuring the security of
            your personal information. This Privacy Policy outlines how we
            collect, use, and safeguard your data when you visit our website or
            make a purchase.
          </p>
          <p className="text-slate-700">
            Please read this policy carefully to understand how we handle your
            Personally Identifiable Information (PII) in compliance with
            applicable privacy laws.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            What Information Do We Collect?
          </h2>
          <p className="mb-4 text-slate-700">
            When you visit our website, register an account, or make a purchase,
            we may collect the following information:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700 max-md:text-sm">
            <li>Your name</li>
            <li>Email address</li>
            <li>Mailing address</li>
            <li>Phone number</li>
            <li>
              Payment information (processed securely by our payment gateway)
            </li>
          </ul>
          <p className="text-slate-700">
            We collect this information to provide you with a seamless shopping
            experience and to improve our services.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            How Do We Use Your Information?
          </h2>
          <p className="mb-4 text-slate-700">
            The information we collect may be used in the following ways:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700">
            <li>
              To personalize your experience and provide tailored product
              recommendations.
            </li>
            <li>To process transactions and deliver your orders.</li>
            <li>
              To send periodic emails about promotions, new products, or
              updates.
            </li>
            <li>To improve our website and customer service.</li>
            <li>To administer contests, surveys, or other site features.</li>
          </ul>
        </section>

        {/* How We Protect Your Information */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            How Do We Protect Your Information?
          </h2>
          <p className="mb-4 text-slate-700">
            We take your security seriously. While we do not use SSL
            certificates (as we only provide affiliate products and
            information), we implement the following measures to protect your
            data:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700">
            <li>Regular malware scanning.</li>
            <li>
              Secure payment processing through trusted third-party gateways.
            </li>
            <li>Restricted access to your personal information.</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Do We Use Cookies?
          </h2>
          <p className="mb-4 text-slate-700">
            Yes, we use cookies to enhance your browsing experience. Cookies are
            small files stored on your device that help us understand your
            preferences and improve our website. However, we do not use cookies
            for tracking purposes.
          </p>
          <p className="mb-4 text-slate-700">
            You can choose to disable cookies through your browser settings.
            Please note that disabling cookies may affect the functionality of
            certain features on our website.
          </p>
        </section>

        {/* Third-Party Services */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Third-Party Services
          </h2>
          <p className="mb-4 text-slate-700">
            We use third-party services, such as Google Analytics and Google
            AdSense, to analyze website traffic and display ads. These services
            may use cookies and collect data about your interactions with our
            website.
          </p>
          <p className="mb-4 text-slate-700">
            You can opt out of Google’s use of cookies by visiting the{" "}
            <a
              href="https://adssettings.google.com"
              className="text-primary hover:underline"
            >
              Google Ad Settings
            </a>{" "}
            page.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Your Rights
          </h2>
          <p className="mb-4 text-slate-700">
            Under the California Online Privacy Protection Act (CalOPPA) and
            other applicable laws, you have the right to:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of receiving marketing communications.</li>
            <li>Request information about how your data is being used.</li>
          </ul>
          <p className="text-slate-700">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:privacy@mygadgets.com"
              className="text-primary hover:underline"
            >
              privacy@mygadgets.com
            </a>
            .
          </p>
        </section>

        {/* Changes to This Policy */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Changes to This Policy
          </h2>
          <p className="mb-4 text-slate-700">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and we will notify you via email if
            there are significant updates.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-primary">
            Contact Us
          </h2>
          <p className="text-slate-700">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="mt-2 text-slate-700">
            Email:{" "}
            <a
              href="mailto:privacy@mygadgets.com"
              className="text-primary hover:underline"
            >
              privacy@mygadgets.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
