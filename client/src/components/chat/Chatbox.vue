<template>
  <div>
    <div class="columns mt-1">
      <div class="column is-12 is-size-6 " id="chatname">
        <div class="m-2">นายธีรภัทร์ บุญช่วยแล้ว</div>
      </div>
    </div>
    <div class="columns mt-3 ml-2" id="chatbox">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-1">
            <v-avatar color="primary" size="70"></v-avatar>
          </div>
          <div class="column is-4 mt-2" id="mes">
            <p>
              aksdlkasldlaklskdlaskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdl;asd;lhjhjhjjmm
            </p>
          </div>
        </div>

        <div class="columns mt-3">
          <div class="column is-1">
            <v-avatar color="primary" size="70"></v-avatar>
          </div>
          <div class="column is-4 mt-2" id="mes">
            <p>
              aksdlkasldlaklskdlaskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdl;asd;lhjhjhjjmm
            </p>
          </div>
        </div>

        <div class="columns mt-3 mr-6">
          <div class="column is-8"></div>
          <div class="column is-4 mt-2" id="mes2">
            <p>
              aksdlkasldlaklskdlaskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdl;asd;lhjhjhjjmm
            </p>
          </div>
        </div>

        <div class="columns mt-3">
          <div class="column is-1">
            <v-avatar color="primary" size="70"></v-avatar>
          </div>
          <div class="column is-4 mt-2" id="mes">
            <p>
              aksdlkasldlaklskdlaskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdl;asd;lhjhjhjjmm
            </p>
          </div>
        </div>

        <div class="columns mt-3">
          <div class="column is-1">
            <v-avatar color="primary" size="70"></v-avatar>
          </div>
          <div class="column is-4 mt-2" id="mes">
            <p>
              aksdlkasldlaklskdlaskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdl;asd;lhjhjhjjmm
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mr-3">
      <div class="column is-1" id="media">
        <button class="button is-info"><i class="fas fa-image"></i></button>
      </div>
      <div class="column is-10">
        <input type="text" class="input" placeholder="Message"/>
      </div>
      <div class="column is-1">
        <button class="button is-info">sent</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Listname",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chatname {
  font-family: "Kanit", sans-serif;
  background: #103766;
  color: white;
}
#chatbox {
  height: 60vh;
  overflow-y: scroll;
}
#mes {
  background: #103766;
  color: white;
  word-wrap: break-word;
  border-radius: 1rem;
}
#mes2 {
  background: white;
  color: black;
  word-wrap: break-word;
  border-radius: 1rem;
}
</style>
