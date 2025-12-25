
export interface EventItem {
  id: string;
  title: string;
  targetGroup: string;
  description: string;
  icon: string;
  tag: string;
  relevantInfo: string[];
  imageUrl?: string;
}

// ChatMessage interface for conversational state in AIChatBot
export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}
