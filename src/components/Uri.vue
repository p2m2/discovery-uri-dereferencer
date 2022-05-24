<script lang="ts" setup>

import { DiscoveryService } from './discovery.service'


console.log('hello script setup')
const msg = "Something"
let some : string = "" 

new DiscoveryService().toString()
.then(
  s => { some = s ; console.log(some)}
).catch( err => some = err)

</script>

<template>
  <div>{{ some }}</div>
</template>