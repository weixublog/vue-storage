<template>
  <div id="test-storage">
    <v-layout column>
      <v-subheader>Insert 相关指令测试</v-subheader>
      <v-flex>
        <v-btn outline
               class="primary"
               @click="saveTestServer" >addString</v-btn>
        <v-btn outline
               class="primary"
               @click="saveRecentChatList" >addList</v-btn>
        <v-btn outline
               class="primary"
               @click="saveRecentChatListItem" >addListItem</v-btn>
      </v-flex>

      <v-divider></v-divider>
      <v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
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
      recentChatItem : {
        id     : uuid.v1(),
        name   : 'Bob',
        number : '13226788734',
        date   : Date.now(),
      },
      account : {
        id   : uuid.v1(),
        name : 'ZhangSan',
        age  : 22,
        sex  : 'M',
      },
    };
  },
  methods : {
    saveTestServer() {
      this.$storage.insert('TEST_SERVER', this.testServer);
    },
    saveRecentChatList() {
      this.$storage.insert('RECENT_CHAT_LIST', this.recentChatList);
    },
    saveRecentChatListItem() {
      this.$storage.insertItem('RECENT_CHAT_LIST', this.recentChatItem);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
