// Example utility function
export function getRecipientsInConversations(
  conversations: {
    id: number;
    name: string;
    date_created: string;
    conversationparticipants: { id: number; userId: number; conversationId: number }[];
  }[],
  recipients: {
    userId: number | undefined;
    fullname: string;
    email: string;
    bio?: string;
    avatar?: string;
  }[]
) {
  // Gather all userIds from conversation participants
  const participantIds = conversations
    .flatMap(conversation => conversation.conversationparticipants)
    .map(participant => participant.userId);

  // Return only those recipients whose userId is in participantIds
  return recipients.filter(recipient => recipient.userId !== undefined && participantIds.includes(recipient.userId));
}