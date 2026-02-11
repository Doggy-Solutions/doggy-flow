type Conversation<T = unknown> = T;

const conversations: Record<string, Conversation> = {};

export const getConversation = <T = unknown>(phone: string): T | undefined => {
	return conversations[phone] as T | undefined;
};

export const setConversation = <T = unknown>(phone: string, data: T): void => {
	conversations[phone] = data;
};

export const resetConversation = (phone: string): void => {
	delete conversations[phone];
};
