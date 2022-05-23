<template>
  <v-app>
    <v-toolbar app dark> 
      MetaboHUB - Resource Description
    </v-toolbar> 
      <v-main>
        <Uri/>
      </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Uri from './components/Uri.vue'

export default {
  name: 'App',

  components: {
    Uri,
  },

  data: () => ({
    //
  }),
}
</script>
