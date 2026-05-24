'use client';

import { useState } from 'react';
import ExportButton from './ExportButton';
import { Mail, Phone, Globe, MapPin, Briefcase, User } from 'lucide-react';

interface ResultsTableProps {
  results: any[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Found {results.length} Leads
        </h2>
        <ExportButton data={results} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Company</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Phone</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Location</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900">{result.companyName}</div>
                  <div className="text-xs text-gray-500">{result.industry}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">{result.fullName}</div>
                  <div className="text-xs text-gray-500">{result.jobTitle}</div>
                </td>
                <td className="px-4 py-3">
                  <a href={`mailto:${result.email}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 truncate" title={result.email}>
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{result.email}</span>
                  </a>
                </td>
                <td className="px-4 py-3">
                  <a href={`tel:${result.phoneNumber}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {result.phoneNumber}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span>{result.city}, {result.state}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setExpandedId(expandedId === result.id ? null : result.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    {expandedId === result.id ? 'Hide' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {expandedId && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mt-4">
          {results.filter((r) => r.id === expandedId).map((result) => (
            <div key={result.id} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {result.fullName} at {result.companyName}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" /> Contact Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {result.fullName} <button onClick={() => handleCopy(result.fullName)} className="text-blue-600 text-xs">Copy</button></p>
                    <p><span className="font-medium">Email:</span> {result.email} <button onClick={() => handleCopy(result.email)} className="text-blue-600 text-xs">Copy</button></p>
                    <p><span className="font-medium">Phone:</span> {result.phoneNumber} <button onClick={() => handleCopy(result.phoneNumber)} className="text-blue-600 text-xs">Copy</button></p>
                    <p><span className="font-medium">Title:</span> {result.jobTitle}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" /> Company Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Company:</span> {result.companyName}</p>
                    <p><span className="font-medium">Industry:</span> {result.industry}</p>
                    <p><span className="font-medium">Size:</span> {result.companySize}</p>
                    <p><span className="font-medium">Website:</span> <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600"><Globe className="w-4 h-4 inline mr-1" />{result.website}</a></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
