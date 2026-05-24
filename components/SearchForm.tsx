'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';

interface SearchFormProps {
  onSearch: (data: any) => void;
  loading: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('US');
  const [state, setState] = useState('');
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country) {
      fetchStates(country);
    }
  }, [country]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'countries' }),
      });
      const data = await response.json();
      setCountries(data.countries);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  };

  const fetchStates = async (selectedCountry: string) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'states', country: selectedCountry }),
      });
      const data = await response.json();
      setStates(data.states || []);
      setState('');
    } catch (error) {
      console.error('Failed to fetch states:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      alert('Please enter a search query');
      return;
    }
    onSearch({ query, country, state, limit });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Building2 className="inline w-4 h-4 mr-2" />
          Company or Person Name
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for companies or people..."
            disabled={loading}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State/Region
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={loading || states.length === 0}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Results Limit
          </label>
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value={100}>100 results</option>
            <option value={500}>500 results</option>
            <option value={1000}>1,000 results</option>
            <option value={5000}>5,000 results</option>
            <option value={10000}>10,000 results</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        {loading ? 'Searching...' : 'Search Leads'}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Searching 100+ public databases. Results are verified and from legal sources.
      </p>
    </form>
  );
}
