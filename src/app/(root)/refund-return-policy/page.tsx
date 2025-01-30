const RefundReturnPolicyPage = () => {
  return (
    <div className="mg-container py-5 md:py-10">
      <div className="rounded-xl p-2 md:border md:p-8">
        {/* Title */}
        <h1 className="mb-6 text-2xl font-bold text-slate-700 md:text-3xl">
          Refund & Return Policy
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Introduction
          </h2>
          <p className="mb-4 text-slate-700">
            At <span className="font-semibold">My Gadgets</span>, we strive to
            ensure your complete satisfaction with every purchase. If you are
            not entirely satisfied with your order, we offer a straightforward
            refund and return process. Please read this policy carefully to
            understand your rights and obligations.
          </p>
        </section>

        {/* Eligibility for Returns */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Eligibility for Returns
          </h2>
          <p className="mb-4 text-slate-700">
            To be eligible for a return, your item must meet the following
            conditions:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700 max-md:text-sm">
            <li>
              The item must be unused, in its original packaging, and in the
              same condition as when you received it.
            </li>
            <li>
              You must initiate the return process within 14 days of receiving
              the item.
            </li>
            <li>
              A valid proof of purchase (e.g., invoice or order number) must be
              provided.
            </li>
          </ul>
        </section>

        {/* Return Process */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Return Process
          </h2>
          <p className="mb-4 text-slate-700">
            To initiate a return, please follow these steps:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700 max-md:text-sm">
            <li>
              Contact our customer support team at{" "}
              <a
                href="mailto:support@mygadgets.com"
                className="text-primary hover:underline"
              >
                support@mygadgets.com
              </a>{" "}
              to request a return authorization.
            </li>
            <li>
              Pack the item securely in its original packaging, including all
              accessories and documentation.
            </li>
            <li>
              Ship the item to the address provided by our customer support
              team.
            </li>
          </ul>
        </section>

        {/* Refund Process */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Refund Process
          </h2>
          <p className="mb-4 text-slate-700">
            Once your return is received and inspected, we will process your
            refund as follows:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700">
            <li>
              Refunds will be issued to the original payment method used for the
              purchase.
            </li>
            <li>
              Shipping costs are non-refundable, except in cases where the item
              is defective or incorrect.
            </li>
            <li>
              Refunds may take up to 7-10 business days to reflect in your
              account.
            </li>
          </ul>
        </section>

        {/* Non-Returnable Items */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Non-Returnable Items
          </h2>
          <p className="mb-4 text-slate-700">
            The following items are not eligible for return or refund:
          </p>
          <ul className="mb-4 list-inside list-disc text-slate-700">
            <li>
              Items that have been used, damaged, or altered after delivery.
            </li>
            <li>Gift cards or downloadable software products.</li>
            <li>
              Items marked as "final sale" or "non-returnable" at the time of
              purchase.
            </li>
          </ul>
        </section>

        {/* Defective or Incorrect Items */}
        <section className="mb-8">
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Defective or Incorrect Items
          </h2>
          <p className="mb-4 text-slate-700">
            If you receive a defective or incorrect item, please contact us
            immediately. We will arrange for a replacement or refund, including
            return shipping costs.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="mb-1 text-xl font-semibold text-primary md:mb-4 md:text-2xl">
            Contact Us
          </h2>
          <p className="text-slate-700">
            If you have any questions about our refund and return policy, please
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

export default RefundReturnPolicyPage;
