'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import ResultsTable from '@/components/ResultsTable';
import DataSourcesBadge from '@/components/DataSourcesBadge';
import { Database, TrendingUp } from 'lucide-react';

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (formData: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'search',
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(data.results || []);
      if (data.results && data.results.length === 0) {
        setError('No results found. Try different search terms.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during search');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Lead Generator</h1>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600 text-lg mb-2">Find B2B leads using legal public databases & open data sources</p>
          <p className="text-gray-500 text-sm">100% compliant • GDPR approved • Free & open APIs</p>
        </div>

        <div className="mb-8">
          <DataSourcesBadge />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium">⚠️ {error}</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600 font-medium">Searching databases...</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ResultsTable results={results} />
          </div>
        )}

        {!loading && results.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Start by searching for companies or people</p>
            <p className="text-gray-400 text-sm mt-2">Results will appear here</p>
          </div>
        )}

        <div className="mt-12 text-center text-gray-600 text-sm">
          <p className="mb-2">Data sourced from:</p>
          <p className="text-gray-500">OpenCorporates • SEC EDGAR • Companies House • OpenStreetMap • Government Registries</p>
          <p className="mt-4 text-gray-400">© 2025 Legal Lead Generation Tool. All data collected in compliance with data protection laws.</p>
        </div>
      </div>
    </div>
  );
}
