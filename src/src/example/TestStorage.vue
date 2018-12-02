<template>
  <div id="test-storage">
    <v-layout column>
      <v-flex>
        <v-btn outline
               class="primary"
               @click="saveTestServer" >TEST_SERVER</v-btn>
      </v-flex>
      <v-flex>
        <v-btn outline
               class="primary"
               @click="saveRecentChatList" >RECENT_CHAT_LIST</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import uuid from 'uuid';

export default {
  name : 'TestStorage',
  data() {
    return {
      testServer     : { address: '10.200.112.165', port: '7777' },
      recentChatList : [
        {
          id     : uuid.v1(),
          name   : 'Linda',
          number : '13110982653',
          date   : Date.now(),
        },
        {
          id     : uuid.v1(),
          name   : 'Tina',
          number : '13117254434',
          date   : Date.now(),
        },
      ],
    };
  },
  methods : {
    saveTestServer() {
      this.$storage.insert('TEST_SERVER', this.testServer);
    },
    saveRecentChatList() {
      this.$storage.insert('RECENT_CHAT_LIST', this.testServer);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
