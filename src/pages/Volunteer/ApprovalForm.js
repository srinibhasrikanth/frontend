import { Button } from "@mui/material";
import jsPDF from "jspdf";

const ApprovalForm = ({ result }) => {
  const handleSubmit = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.addImage("/images/approval.png", "PNG", 0, 0, 200, 300);
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(150, 87.5, "09-09-2024");
    // Check if result.result exists and contains the expected properties
    if (result.result) {
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
      } = result.result;

      // Ensure all properties are of type string before passing to doc.text()
      doc.text(90, 110, String(title));
      doc.text(90, 119, String(type));
      doc.text(90, 128, String(to_whom));
      doc.text(90, 137, String(date));
      doc.text(90, 146, String(time));
      doc.text(90, 154, String(venue));
      doc.text(90, 163, String(resourcePerson));
      doc.text(90, 172, String(modeOfConduct));
      doc.text(90, 180, String(resourcesRequired));
      doc.text(90, 189, String(conductedBy));
      doc.text(90, 199, String(no_of_volunteers));
      doc.text(90, 207, String(prize_money));
      doc.text(90, 215, String(budget));
      doc.text(90, 224, String(remarks));

      doc.save(`${title}.pdf`);
    } else {
      console.error("Result is missing or invalid.");
    }
  };

  return (
    <div>
      <Button onClick={handleSubmit}>Approval form</Button>
    </div>
  );
};
export default ApprovalForm;
