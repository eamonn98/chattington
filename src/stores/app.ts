import { defineStore } from 'pinia';
import { ref } from 'vue';

// interface ChatMessage {
//   user: string;
//   timestamp: Date;
//   message: string;
// }

export const useAppStore = defineStore('app', () => {
  const endpointHost = ref<string>(
    'https://paltrygiantassignment.eamonn98.repl.co'
  );
  const user = ref<string>('Todd Howard');
  const typedMessage = ref<string | null>(null);
  const chats = ref([]);

  const retrieveLatest = async () => {
    const resp = await fetch(`${endpointHost.value}/refreshChats`);
    chats.value = await resp.json();
  };

  const sendMessage = async () => {
    chats.value.push({
      id: chats.value.length + 1,
      user: user.value,
      message: typedMessage.value,
      timestamp: new Date(),
    });

    // Post to endpoint
    await fetch(`${endpointHost.value}/sendChat`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user.value,
        message: typedMessage.value,
      }),
    });

    typedMessage.value = null;
  };

  return {
    endpointHost,
    user,
    typedMessage,
    chats,
    retrieveLatest,
    sendMessage,
  };
});
