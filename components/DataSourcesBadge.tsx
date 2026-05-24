'use client';

import { Info } from 'lucide-react';
import { useState } from 'react';

const DATA_SOURCES = [
  { name: 'OpenCorporates', url: 'https://opencorporates.com', desc: 'Global company registry - Most comprehensive open corporate data', countries: 'All' },
  { name: 'SEC EDGAR', url: 'https://www.sec.gov/cgi-bin/browse-edgar', desc: 'US public company filings - Official financial and executive data', countries: 'US' },
  { name: 'Companies House', url: 'https://www.companieshouse.gov.uk', desc: 'UK company registry - Official incorporation and officer data', countries: 'UK' },
  { name: 'ASIC', url: 'https://www.asic.gov.au', desc: 'Australian Securities Register - Official registration data', countries: 'AU' },
  { name: 'Ministry of Corporate Affairs', url: 'https://www.mca.gov.in', desc: 'Indian company registry - Official registration and compliance data', countries: 'IN' },
  { name: 'Handelsregister', url: 'https://www.handelsregister.de', desc: 'German business registry - Official company registration', countries: 'DE' },
  { name: 'ACRA', url: 'https://www.acra.gov.sg', desc: 'Singapore company registry - Official incorporation data', countries: 'SG' },
  { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', desc: 'Geographic and business location data - Community curated', countries: 'Global' },
];

export default function DataSourcesBadge() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Info className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Legal Data Sources</h3>
            <p className="text-sm text-gray-700 mb-2">
              All data is collected from verified, legal, and publicly available sources. This tool is fully compliant with GDPR, CCPA, and international data protection laws.
            </p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showDetails ? 'Hide' : 'View'} data sources →
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-green-200 space-y-3">
          {DATA_SOURCES.map((source, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  {source.name} →
                </a>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {source.countries}
                </span>
              </div>
              <p className="text-sm text-gray-600">{source.desc}</p>
            </div>
          ))}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-yellow-800">
              <strong>Compliance Notice:</strong> This tool adheres to all applicable data protection regulations including GDPR Article 6(1)(f) (legitimate interest), CCPA, and similar laws. Data is sourced only from official government registries and public records.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
