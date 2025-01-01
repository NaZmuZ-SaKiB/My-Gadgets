"use client";

import MGButton from "@/components/global/shared/MGButton";

const InvoiceDownloadButton = () => {
  const handleClick = () => {
    const invoice = document.getElementById("invoice");

    if (invoice) {
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-sm justify-center">
      <MGButton className="rounded-md" onClick={handleClick}>
        Download
      </MGButton>
    </div>
  );
};

export default InvoiceDownloadButton;
