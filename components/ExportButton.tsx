'use client';

import { Download } from 'lucide-react';

interface ExportButtonProps {
  data: any[];
}

export default function ExportButton({ data }: ExportButtonProps) {
  const exportToCSV = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['Company Name', 'Full Name', 'Job Title', 'Email', 'Phone Number', 'Website', 'Industry', 'Company Size', 'Country', 'State', 'City', 'LinkedIn Profile', 'Data Source'];

    const csvContent = [
      headers.join(','),
      ...data.map((row) =>
        [
          `"${row.companyName}"`,
          `"${row.fullName}"`,
          `"${row.jobTitle}"`,
          `"${row.email}"`,
          `"${row.phoneNumber}"`,
          `"${row.website}"`,
          `"${row.industry}"`,
          `"${row.companySize}"`,
          `"${row.country}"`,
          `"${row.state}"`,
          `"${row.city}"`,
          `"${row.linkedinProfile}"`,
          `"${row.dataSource}"`,
        ].join(',')
      ),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
    element.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
    >
      <Download className="w-5 h-5" />
      Export to CSV
    </button>
  );
}
