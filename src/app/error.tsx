"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-4 max-w-md rounded-xl border bg-white p-8 text-center">
        {/* Error Icon */}
        <div className="mb-4 text-6xl text-red-500">⚠️</div>

        {/* Error Message */}
        <h2 className="mb-4 text-2xl font-bold text-slate-700">
          Oops! Something went wrong.
        </h2>
        <p className="mb-6 text-slate-600">
          We apologize for the inconvenience. Please try again or contact
          support if the issue persists.
        </p>

        {/* Error Details (Optional) */}
        <details className="mb-6 text-left">
          <summary className="cursor-pointer font-semibold text-slate-700">
            Error Details
          </summary>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            {error.message}
          </pre>
        </details>

        {/* Try Again Button */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => reset()}
            className="rounded-lg border bg-slate-50 px-6 py-2 text-slate-700 transition duration-300 hover:bg-primary-hover hover:text-white"
          >
            Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-6 py-2 text-white transition duration-300 hover:bg-primary-hover"
          >
            Reload
          </button>
        </div>

        {/* Contact Support Link */}
        <p className="mt-4 text-slate-600">
          Need help?{" "}
          <a
            href="mailto:support@mygadgets.com"
            className="text-primary hover:underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
