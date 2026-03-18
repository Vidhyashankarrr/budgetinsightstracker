import React from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Reports = ({ transactions }) => {
  const csvData = transactions.map((t) => ({
    Date: t.date,
    Type: t.type,
    Category: t.category,
    Amount: t.amount,
  }));

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(18);
    doc.text("Expense Report", 40, 50);

    const tableColumn = ["Date", "Type", "Category", "Amount"];
    const tableRows = transactions.map((t) => [t.date, t.type, t.category, t.amount]);

    doc.autoTable({
      startY: 70,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [103, 58, 183] }, // purple header
    });

    doc.save("expense_report.pdf");
  };

  const predictNextMonth = () => {
    const expenseTransactions = transactions.filter((t) => t.type === "expense");
    const total = expenseTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const months = new Set(expenseTransactions.map((t) => t.date.slice(0, 7))).size || 1;
    return (total / months).toFixed(2);
  };

  const savingTips = () => {
    const prediction = predictNextMonth();
    if (prediction > 50000) return "Consider reducing luxury or entertainment expenses.";
    if (prediction > 20000) return "Try to save 10-15% of your monthly income.";
    return "Great job! Keep tracking to save more.";
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">Reports & Insights</h2>

      <div className="flex gap-4">
        <button
          onClick={generatePDF}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl hover:opacity-90 transition"
        >
          Export PDF
        </button>

        <CSVLink
          data={csvData}
          filename={"expense_report.csv"}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:opacity-90 transition"
        >
          Export CSV
        </CSVLink>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Predicted Next Month Expense:</strong> ₹{predictNextMonth()}
        </p>
        <p>
          <strong>Saving Tip:</strong> {savingTips()}
        </p>
      </div>
    </div>
  );
};

export default Reports;

















// import React from "react";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const Reports = ({ transactions }) => {
//   // CSV data
//   const csvData = transactions.map((t) => ({
//     Date: t.date,
//     Type: t.type,
//     Category: t.category,
//     Amount: t.amount,
//   }));

//   // Generate PDF
//   const generatePDF = () => {
//     const doc = new jsPDF("p", "pt", "a4"); // page format A4, points
//     doc.setFontSize(18);
//     doc.text("Expense Report", 40, 50);

//     const tableColumn = ["Date", "Type", "Category", "Amount"];
//     const tableRows = transactions.map((t) => [t.date, t.type, t.category, t.amount]);

//     doc.autoTable({
//       startY: 70, 
//       head: [tableColumn],
//       body: tableRows,
//       theme: "striped",
//       headStyles: { fillColor: [103, 58, 183] }, // purple header
//     });

//     doc.save("expense_report.pdf");
//   };

//   // Monthly prediction (simple average)
//   const predictNextMonth = () => {
//     const expenseTransactions = transactions.filter((t) => t.type === "expense");
//     const total = expenseTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
//     const months = new Set(expenseTransactions.map((t) => t.date.slice(0, 7))).size || 1;
//     return (total / months).toFixed(2);
//   };

 
//   const savingTips = () => {
//     const prediction = predictNextMonth();
//     if (prediction > 50000) return "Consider reducing luxury or entertainment expenses.";
//     if (prediction > 20000) return "Try to save 10-15% of your monthly income.";
//     return "Great job! Keep tracking to save more.";
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow space-y-4">
//       <h2 className="text-xl font-bold">Reports & Insights</h2>

//       <div className="flex gap-4">
//         <button
//           onClick={generatePDF}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Export PDF
//         </button>

//         <CSVLink
//           data={csvData}
//           filename={"expense_report.csv"}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Export CSV
//         </CSVLink>
//       </div>

//       <div className="mt-4">
//         <p>
//           <strong>Predicted Next Month Expense:</strong> ₹{predictNextMonth()}
//         </p>
//         <p>
//           <strong>Saving Tip:</strong> {savingTips()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Reports;

