import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Terms",
  description: "Read the terms and conditions for EMI payments at My Gadgets.",
};

const EMITermsPage = () => {
  return (
    <div className="mg-container py-5 md:py-10">
      <div className="rounded-xl p-2 md:border md:p-8">
        {/* Title */}
        <h1 className="mb-6 text-2xl font-bold text-slate-700 md:text-3xl">
          EMI Terms and Conditions
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Introduction
          </h2>
          <p className="mb-4 text-slate-700">
            At <span className="font-semibold">My Gadgets</span>, we offer
            Equated Monthly Installment (EMI) options to make your purchases
            more affordable. Please read these terms and conditions carefully
            before opting for EMI payment.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Eligibility
          </h2>
          <p className="mb-4 text-slate-700">
            To avail of EMI options, you must meet the following criteria:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700">
            <li>You must be at least 18 years old.</li>
            <li>
              You must have a valid credit card from a participating bank.
            </li>
            <li>
              Your credit card must have sufficient credit limit for the
              transaction.
            </li>
          </ul>
        </section>

        {/* EMI Process */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            EMI Process
          </h2>
          <p className="mb-4 text-slate-700">
            When you choose EMI as your payment option, the following process
            applies:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700">
            <li>
              The total order amount will be divided into equal monthly
              installments.
            </li>
            <li>
              Interest rates and processing fees will be applied as per your
              bank{`'`}s terms.
            </li>
            <li>
              The first installment will be charged at the time of purchase.
            </li>
            <li>
              Subsequent installments will be automatically deducted from your
              credit card.
            </li>
          </ul>
        </section>

        {/* Interest Rates and Fees */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Interest Rates and Fees
          </h2>
          <p className="mb-4 text-slate-700">
            The interest rates and processing fees for EMI transactions are
            determined by your bank. Please check with your bank for detailed
            information.
          </p>
        </section>

        {/* Cancellation and Refunds */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Cancellation and Refunds
          </h2>
          <p className="mb-4 text-slate-700">
            If you cancel your order or request a refund, the following terms
            apply:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700">
            <li>Any paid installments will be refunded to your credit card.</li>
            <li>Interest and processing fees are non-refundable.</li>
            <li>Refunds may take up to 7-10 business days to process.</li>
          </ul>
        </section>

        {/* Late Payments */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Late Payments
          </h2>
          <p className="mb-4 text-slate-700">
            If you fail to make an EMI payment on time, your bank may charge a
            late payment fee. Repeated late payments may affect your credit
            score.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Contact Us
          </h2>
          <p className="text-slate-700">
            If you have any questions about our EMI terms and conditions, please
            contact us at:
          </p>
          <p className="mt-2 text-slate-700">
            Email:{" "}
            <a
              href="mailto:support@mygadgets.com"
              className="text-primary hover:underline"
            >
              support@mygadgets.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default EMITermsPage;
