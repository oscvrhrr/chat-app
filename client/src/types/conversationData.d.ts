export interface IConversationData {
  id: number;
  name: string;
  date_created: string;
  conversationparticipants: {
    id: number;
    userId: number;
    conversationId: number;
  }[];
}