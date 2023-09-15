<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Chatter</q-toolbar-title>

        <div class="q-my-sm row items-center">
          <span>
            <q-circular-progress
              show-value
              class="text-light-blue q-ma-md"
              :value="timerPercent"
              label="Hi"
              size="40px"
              color="white"
            >
              <div class="text-white">{{ timeBeforeRefresh }}</div>
            </q-circular-progress>
          </span>
          <span>
            <q-input
              type="text"
              dense
              filled
              color="white"
              label="Hostname"
              v-model="endpointHost"
            >
              <template v-slot:prepend>
                <q-icon name="computer" />
              </template>
            </q-input>
          </span>
          <span class="q-ml-sm">
            <q-input
              type="text"
              dense
              filled
              color="white"
              label="Username"
              v-model="user"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </span>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-2 text-white">
      <q-toolbar>
        <div class="col justify-evenly q-ma-sm">
          <q-input
            type="text"
            filled
            color="white"
            label="Message"
            v-model="typedMessage"
          >
            <template v-slot:after>
              <q-btn
                flat
                icon-right="send"
                label="Send"
                @click="appStore.sendMessage"
              />
            </template>
          </q-input>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from 'stores/app.ts';

const REFRESH_IN_SECONDS = 6;

const appStore = useAppStore();
const timeBeforeRefresh = ref(0);

const { endpointHost, user, typedMessage } = storeToRefs(appStore);

onMounted(() => {
  decreaseTimer();
});

const decreaseTimer = () => {
  if (timeBeforeRefresh.value <= 0) {
    appStore.retrieveLatest();
    timeBeforeRefresh.value = REFRESH_IN_SECONDS + 1;
  }
  timeBeforeRefresh.value -= 1;
  setTimeout(decreaseTimer, 1000);
};

const timerPercent = computed(() => {
  return 100 * (timeBeforeRefresh.value / REFRESH_IN_SECONDS);
});
</script>
