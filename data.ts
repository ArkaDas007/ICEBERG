export type TeamTab = 'organizers' | 'co-organizers' | 'core';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: TeamTab;
  avatarIcon?: string;
  image?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  // Organizers
  { id: 'o1', name: 'Debjoy Sarkar', role: 'IE(I) CONVENOR', category: 'organizers', avatarIcon: '👤', image: '/Debjoy.jpeg' },
  { id: 'o2', name: 'Vageesha Kriti', role: 'IE(I) CONVENOR', category: 'organizers', avatarIcon: '👤', image: '/Vageesha.jpeg' },
  
  // Co-Organizers
  { id: 'co1', name: 'IIC Coordinator', role: 'Innovation Council', category: 'co-organizers', avatarIcon: '👤' },
  { id: 'co2', name: 'CHS Representative', role: 'Cultural Heritage Society', category: 'co-organizers', avatarIcon: '👤' },
  { id: 'co3', name: 'Departmental Faculty', role: 'Event Management', category: 'co-organizers', avatarIcon: '👤' },

  // Core Team
  { id: 'ct1', name: 'Arka Pratim Das', role: 'TECHNICAL HEAD', category: 'core', avatarIcon: '👤', image: '/Arka.jpeg' },
  { id: 'ct2', name: 'Technical Head', role: 'Hackathon Coordinator', category: 'core', avatarIcon: '👤' },
  { id: 'ct3', name: 'Logistics Manager', role: 'Operations & Strategy', category: 'core', avatarIcon: '👤' },
  { id: 'ct4', name: 'PR & Outreach', role: 'Communications Lead', category: 'core', avatarIcon: '👤' },
  { id: 'ct5', name: 'Design Lead', role: 'Visual Identity', category: 'core', avatarIcon: '👤' },
  { id: 'ct6', name: 'Core Member', role: 'Event Volunteer', category: 'core', avatarIcon: '👤' },
];
