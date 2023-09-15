<template>
  <q-page class="column q-ma-xl q-px-xl">
    <div class="col">
      <div id="chat-messages">
        <span>
          <TransitionGroup name="chats" tag="span">
            <q-chat-message
              v-for="chat in chats"
              :key="chat.id"
              :name="chat.user"
              :text="[chat.message]"
              :sent="chat.user === user"
              :stamp="
                'Sent at: ' + new Date(chat.timestamp).toLocaleTimeString()
              "
            />
          </TransitionGroup>
        </span>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from 'stores/app.ts';

const appStore = useAppStore();

const { user, chats } = storeToRefs(appStore);
</script>
