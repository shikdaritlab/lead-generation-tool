import { NextRequest, NextResponse } from 'next/server';

const COUNTRIES: Record<string, string> = {
  US: 'United States',
  UK: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  IN: 'India',
  DE: 'Germany',
  FR: 'France',
  JP: 'Japan',
  SG: 'Singapore',
  NZ: 'New Zealand',
  ZA: 'South Africa',
  BR: 'Brazil',
};

const STATES: Record<string, string[]> = {
  US: ['California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'],
  UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  CA: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan'],
  AU: ['New South Wales', 'Victoria', 'Queensland', 'South Australia', 'Western Australia', 'Tasmania'],
  IN: ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Telangana', 'Uttar Pradesh'],
  DE: ['North Rhine-Westphalia', 'Bavaria', 'Baden-Württemberg', 'Berlin', 'Hesse', 'Saxony'],
  FR: ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes', 'Occitanie'],
  JP: ['Tokyo', 'Osaka', 'Kanagawa', 'Saitama', 'Chiba', 'Hyogo', 'Kyoto'],
  SG: ['Singapore'],
  NZ: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Dunedin'],
  ZA: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Free State', 'Limpopo'],
  BR: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Rio Grande do Sul', 'Bahia'],
};

const SAMPLE_LEADS = [
  {
    id: '1',
    companyName: 'TechVision Solutions',
    fullName: 'John Anderson',
    jobTitle: 'CEO & Founder',
    email: 'john.anderson@techvision.com',
    phoneNumber: '+1-415-555-0123',
    website: 'www.techvision.com',
    industry: 'Software Development',
    companySize: '50-200 employees',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    linkedinProfile: 'linkedin.com/in/johnanderson',
    dataSource: 'OpenCorporates',
  },
  {
    id: '2',
    companyName: 'Digital Innovations Ltd',
    fullName: 'Sarah Mitchell',
    jobTitle: 'Head of Sales',
    email: 'sarah.mitchell@digitalinnovations.co.uk',
    phoneNumber: '+44-20-7946-0958',
    website: 'www.digitalinnovations.co.uk',
    industry: 'Digital Marketing',
    companySize: '20-50 employees',
    country: 'United Kingdom',
    state: 'England',
    city: 'London',
    linkedinProfile: 'linkedin.com/in/sarahmitchell',
    dataSource: 'Companies House',
  },
  {
    id: '3',
    companyName: 'Maple Tech Enterprises',
    fullName: 'Michael Chen',
    jobTitle: 'Business Development Manager',
    email: 'michael.chen@mapletech.ca',
    phoneNumber: '+1-416-555-0456',
    website: 'www.mapletech.ca',
    industry: 'Cloud Services',
    companySize: '100-500 employees',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    linkedinProfile: 'linkedin.com/in/michaelchen',
    dataSource: 'OpenCorporates',
  },
];

function generateMockLeads(query: string, country: string, state: string, limit: number = 50): any[] {
  const leads = [];
  const baseLeads = SAMPLE_LEADS.filter(lead => 
    (!country || lead.country === COUNTRIES[country]) &&
    (!state || lead.state === state) &&
    (lead.companyName.toLowerCase().includes(query.toLowerCase()) || 
     lead.fullName.toLowerCase().includes(query.toLowerCase()))
  );
  
  for (let i = 0; i < Math.min(limit, Math.max(baseLeads.length, 5)); i++) {
    const sample = baseLeads[i % baseLeads.length] || SAMPLE_LEADS[i % SAMPLE_LEADS.length];
    leads.push({ ...sample, id: `${Math.random().toString(36).substr(2, 9)}-${i}` });
  }
  return leads;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, query, country, state, limit = 50 } = body;

    if (action === 'countries') {
      return NextResponse.json({
        countries: Object.entries(COUNTRIES).map(([code, name]) => ({ code, name })),
      });
    }

    if (action === 'states') {
      if (!country || !STATES[country]) {
        return NextResponse.json(
          { error: 'Invalid country code' },
          { status: 400 }
        );
      }
      return NextResponse.json({
        states: STATES[country],
      });
    }

    if (action === 'search') {
      if (!query || query.trim().length < 2) {
        return NextResponse.json(
          { error: 'Search query must be at least 2 characters' },
          { status: 400 }
        );
      }

      const searchLimit = Math.min(limit, 10000);
      const results = generateMockLeads(query, country, state, searchLimit);

      return NextResponse.json({
        success: true,
        results,
        totalFound: results.length,
        dataSources: ['OpenCorporates', 'SEC EDGAR', 'Companies House', 'Government Registries'],
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
