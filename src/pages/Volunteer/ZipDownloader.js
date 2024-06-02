import React, { useState } from "react";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const ZipDownloader = ({ item }) => {
  const [titleZip, setTitleZip] = useState("");

  // Utility function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generatePDFs = () => {
    // Default date for demonstration
    const defaultDate = formatDate("2024-09-09");

    // approval form
    const pdf1 = new jsPDF();
    pdf1.setFontSize(16);
    pdf1.setFont("helvetica", "normal");
    pdf1.addImage("/images/approval.png", "PNG", 0, 0, 200, 300);
    pdf1.setFontSize(12);
    pdf1.setFont("times", "normal");
    pdf1.text(150, 87.5, defaultDate);

    let pdf1Blob = null;
    let pdf2Blob = null;
    let pdf3Blob = null;

    if (item.item) {
      const {
        title,
        type,
        to_whom,
        date,
        time,
        venue,
        resourcePerson,
        modeOfConduct,
        resourcesRequired,
        conductedBy,
        no_of_volunteers,
        prize_money,
        budget,
        remarks,
        current,
        pr_date,
      } = item.item;
      console.log(item.item);
      setTitleZip(item.item.title);

      pdf1.text(90, 110, String(title));
      pdf1.text(90, 119, String(type));
      pdf1.text(90, 128, String(to_whom));
      pdf1.text(90, 137, formatDate(date));
      pdf1.text(90, 146, String(time));
      pdf1.text(90, 154, String(venue));
      pdf1.text(90, 163, String(resourcePerson));
      pdf1.text(90, 172, String(modeOfConduct));
      pdf1.text(90, 180, String(resourcesRequired));
      pdf1.text(90, 189, String(conductedBy));
      pdf1.text(90, 199, String(no_of_volunteers));
      pdf1.text(90, 207, String(prize_money));
      pdf1.text(90, 215, String(budget));
      pdf1.text(90, 224, String(remarks));

      pdf1Blob = pdf1.output("blob");

      // circular form
      const pdf2 = new jsPDF();
      pdf2.setFontSize(16);
      pdf2.setFont("helvetica", "normal");
      pdf2.addImage("/images/circular.png", "PNG", 0, 0, 200, 300);
      pdf2.setFontSize(12);
      pdf2.setFont("times", "normal");
      pdf2.text(153, 75, defaultDate);

      pdf2.text(90, 127, String(title));
      pdf2.text(90, 138, String(type));
      pdf2.text(90, 150, String(to_whom));
      pdf2.text(90, 162, formatDate(date));
      pdf2.text(90, 174, String(time));
      pdf2.text(90, 186, String(venue));
      pdf2.text(90, 198, String(resourcePerson));
      pdf2.text(90, 212, String(modeOfConduct));
      pdf2Blob = pdf2.output("blob");

      // permission letter
      const pdf3 = new jsPDF();
      pdf3.setFontSize(16);
      pdf3.setFont("helvetica", "normal");
      pdf3.addImage("/images/pr_permission.png", "PNG", 0, 0, 200, 300);
      pdf3.setFontSize(14);
      pdf3.setFont("times", "normal");
      pdf3.text(170, 59, formatDate(current));
      pdf3.text(
        40,
        82,
        ` Seeking permission to promote public relations activities regarding
        `
      );
      pdf3.text(40, 92, ` ${String(title)} in the college.`);
      pdf3.text(
        20,
        110,
        `ACM Student Chapter of VNRVJIET, in association with the Department of Information `
      );
      pdf3.text(
        20,
        120,
        `Technology proposed to conduct ${String(title)} for ${String(
          to_whom
        )}. As a part of this event we `
      );
      pdf3.text(
        20,
        130,
        `request you to grant permission for conducting PR in college on ${formatDate(
          pr_date
        )}.`
      );

      pdf3Blob = pdf3.output("blob");
    }

    return { pdf1Blob, pdf2Blob, pdf3Blob };
  };

  const createAndDownloadZip = () => {
    const { pdf1Blob, pdf2Blob, pdf3Blob } = generatePDFs();

    const zip = new JSZip();
    zip.file("approval.pdf", pdf1Blob);
    zip.file("circular.pdf", pdf2Blob);
    zip.file("permission.pdf", pdf3Blob);
    console.log(titleZip);
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${titleZip}.zip`);
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={createAndDownloadZip}
      >
        Download ZIP of PDFs
      </Button>
    </div>
  );
};

export default ZipDownloader;
