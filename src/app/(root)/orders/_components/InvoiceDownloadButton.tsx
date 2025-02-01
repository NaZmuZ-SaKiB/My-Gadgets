"use client";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import MGButton from "@/components/global/shared/MGButton";

const InvoiceDownloadButton = () => {
  const handleClick = async () => {
    const invoice = document.getElementById("invoice");

    if (!invoice) return;

    const style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet?.insertRule(
      "body > div:last-child img { display: inline-block; }",
    );

    const canvas = await html2canvas(invoice, {
      scale: 2,
    });

    style.remove();

    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="mx-auto mt-4 flex max-w-screen-sm justify-center">
      <MGButton className="rounded-md" onClick={handleClick}>
        Download
      </MGButton>
    </div>
  );
};

export default InvoiceDownloadButton;
