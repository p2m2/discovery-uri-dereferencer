<script lang="ts" setup>

import { DiscoveryService } from './discovery.service'
import { ref, computed } from 'vue'

const props = defineProps({
  uri: { type: String, required: true }
})

new DiscoveryService().toString(props.uri).then(
  keyValues => { 
    console.log("..........................................................")
    let r = []
    
    keyValues.forEach((value: string, key: string) => {
      r.push([key,value])
    });
    console.log("..........................................................")
    console.log(r)
  }
  ).catch( err => {})

const DatatypePropertiesValues = computed(() => {
  let res = ["r1","r2"] ;

  }) 



console.log('hello script setup')

</script>

<template>
  <div class="container">
    <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Datatype Property</th>
                    <th>Vale</th>
                </tr>
            </thead>
            <tbody>
              
                <tr v-for="(item, index) in lDatatypePropertiesValues" :key="index">
                    <td>{{item[0]}}</td>
                    <td>{{item[1]}}</td>
                </tr>
            </tbody>
        </table>
  </div>    
</template>