// Local storage service for guest users and offline mode
import type { Campaign, Candidate } from './database';

const STORAGE_KEYS = {
  CAMPAIGNS: 'hireflow_campaigns',
  CANDIDATES: 'hireflow_candidates',
};

// Initialize dummy data for guest users
export function initializeDummyData(userId: string) {
  const existingCampaigns = getLocalCampaigns(userId);
  
  // Only add dummy data if no campaigns exist
  if (existingCampaigns.length === 0) {
    const dummyCampaigns: Campaign[] = [
      {
        id: 'demo-campaign-1',
        user_id: userId,
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        employment_type: 'Full-time',
        experience_level: 'Senior',
        salary_range: '$120,000 - $160,000',
        job_description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.',
        requirements: '5+ years of React experience, TypeScript, Modern CSS frameworks, Strong communication skills',
        openings: 2,
        created_at: new Date().toISOString(),
      },
      {
        id: 'demo-campaign-2',
        user_id: userId,
        title: 'Product Manager',
        department: 'Product',
        location: 'Remote',
        employment_type: 'Full-time',
        experience_level: 'Mid-level',
        salary_range: '$100,000 - $140,000',
        job_description: 'Join our product team to drive product vision and strategy for our core platform.',
        requirements: '3+ years of product management experience, Strong analytical skills, Excellent communication',
        openings: 1,
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: 'demo-campaign-3',
        user_id: userId,
        title: 'UX Designer',
        department: 'Design',
        location: 'New York, NY',
        employment_type: 'Full-time',
        experience_level: 'Mid-level',
        salary_range: '$90,000 - $120,000',
        job_description: 'Create beautiful and intuitive user experiences for our growing product suite.',
        requirements: 'Portfolio showcasing UX work, Figma expertise, User research experience, 3+ years experience',
        openings: 1,
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ];

    const dummyCandidates: Candidate[] = [
      // Candidates for Senior Frontend Developer
      {
        id: 'demo-candidate-1',
        campaign_id: 'demo-campaign-1',
        user_id: userId,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567',
        stage: 'interview',
        notes: 'Strong React background, excellent communication skills',
        added_date: new Date().toISOString().split('T')[0],
      },
      {
        id: 'demo-candidate-2',
        campaign_id: 'demo-campaign-1',
        user_id: userId,
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        phone: '+1 (555) 234-5678',
        stage: 'screening',
        notes: 'TypeScript expert, previously at Google',
        added_date: new Date().toISOString().split('T')[0],
      },
      {
        id: 'demo-candidate-3',
        campaign_id: 'demo-campaign-1',
        user_id: userId,
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@example.com',
        stage: 'applied',
        notes: '',
        added_date: new Date().toISOString().split('T')[0],
      },
      {
        id: 'demo-candidate-4',
        campaign_id: 'demo-campaign-1',
        user_id: userId,
        name: 'David Kim',
        email: 'david.kim@example.com',
        phone: '+1 (555) 345-6789',
        stage: 'offer',
        notes: 'Top candidate, awaiting offer decision',
        added_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      },
      // Candidates for Product Manager
      {
        id: 'demo-candidate-5',
        campaign_id: 'demo-campaign-2',
        user_id: userId,
        name: 'Amanda Wilson',
        email: 'amanda.wilson@example.com',
        phone: '+1 (555) 456-7890',
        stage: 'interview',
        notes: 'Strong product sense, great with stakeholders',
        added_date: new Date().toISOString().split('T')[0],
      },
      {
        id: 'demo-candidate-6',
        campaign_id: 'demo-campaign-2',
        user_id: userId,
        name: 'James Taylor',
        email: 'james.taylor@example.com',
        stage: 'screening',
        notes: '',
        added_date: new Date().toISOString().split('T')[0],
      },
      {
        id: 'demo-candidate-7',
        campaign_id: 'demo-campaign-2',
        user_id: userId,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        phone: '+1 (555) 567-8901',
        stage: 'rejected',
        notes: 'Not enough technical background',
        added_date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      },
      // Candidates for UX Designer
      {
        id: 'demo-candidate-8',
        campaign_id: 'demo-campaign-3',
        user_id: userId,
        name: 'Olivia Martinez',
        email: 'olivia.martinez@example.com',
        phone: '+1 (555) 678-9012',
        stage: 'interview',
        notes: 'Excellent portfolio, strong in user research',
        added_date: new Date().toISOString().split('T')[0],
      },
      {
        id: 'demo-candidate-9',
        campaign_id: 'demo-campaign-3',
        user_id: userId,
        name: 'Ryan Thompson',
        email: 'ryan.thompson@example.com',
        stage: 'applied',
        notes: '',
        added_date: new Date().toISOString().split('T')[0],
      },
    ];

    // Save to localStorage
    saveLocalCampaigns(dummyCampaigns);
    saveLocalCandidates(dummyCandidates);
    
    console.log('✅ Dummy data initialized for guest user');
  }
}

// Campaign operations
export function saveLocalCampaign(campaign: Campaign): boolean {
  try {
    const campaigns = getLocalCampaigns(campaign.user_id);
    const existingIndex = campaigns.findIndex(c => c.id === campaign.id);
    
    if (existingIndex >= 0) {
      campaigns[existingIndex] = campaign;
    } else {
      campaigns.push(campaign);
    }
    
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    return true;
  } catch (error) {
    console.error('Error saving campaign to localStorage:', error);
    return false;
  }
}

export function getLocalCampaigns(userId: string): Campaign[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
    if (!data) return [];
    
    const allCampaigns: Campaign[] = JSON.parse(data);
    return allCampaigns.filter(c => c.user_id === userId);
  } catch (error) {
    console.error('Error getting campaigns from localStorage:', error);
    return [];
  }
}

function saveLocalCampaigns(campaigns: Campaign[]): void {
  try {
    const existing = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
    const allCampaigns: Campaign[] = existing ? JSON.parse(existing) : [];
    
    // Merge campaigns
    campaigns.forEach(newCampaign => {
      const index = allCampaigns.findIndex(c => c.id === newCampaign.id);
      if (index >= 0) {
        allCampaigns[index] = newCampaign;
      } else {
        allCampaigns.push(newCampaign);
      }
    });
    
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(allCampaigns));
  } catch (error) {
    console.error('Error saving campaigns to localStorage:', error);
  }
}

// Candidate operations
export function saveLocalCandidate(candidate: Candidate): boolean {
  try {
    const candidates = getLocalCandidates(candidate.campaign_id);
    const existingIndex = candidates.findIndex(c => c.id === candidate.id);
    
    if (existingIndex >= 0) {
      candidates[existingIndex] = candidate;
    } else {
      candidates.push(candidate);
    }
    
    // Get all candidates and update
    const allCandidatesData = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
    const allCandidates: Candidate[] = allCandidatesData ? JSON.parse(allCandidatesData) : [];
    
    // Remove old candidates for this campaign and add updated ones
    const otherCandidates = allCandidates.filter(c => c.campaign_id !== candidate.campaign_id);
    const updatedCandidates = [...otherCandidates, ...candidates];
    
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(updatedCandidates));
    return true;
  } catch (error) {
    console.error('Error saving candidate to localStorage:', error);
    return false;
  }
}

export function getLocalCandidates(campaignId: string): Candidate[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
    if (!data) return [];
    
    const allCandidates: Candidate[] = JSON.parse(data);
    return allCandidates.filter(c => c.campaign_id === campaignId);
  } catch (error) {
    console.error('Error getting candidates from localStorage:', error);
    return [];
  }
}

function saveLocalCandidates(candidates: Candidate[]): void {
  try {
    const existing = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
    const allCandidates: Candidate[] = existing ? JSON.parse(existing) : [];
    
    // Merge candidates
    candidates.forEach(newCandidate => {
      const index = allCandidates.findIndex(c => c.id === newCandidate.id);
      if (index >= 0) {
        allCandidates[index] = newCandidate;
      } else {
        allCandidates.push(newCandidate);
      }
    });
    
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(allCandidates));
  } catch (error) {
    console.error('Error saving candidates to localStorage:', error);
  }
}
