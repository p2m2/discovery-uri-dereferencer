<script setup>
import { SWDiscoveryConfiguration, SWDiscovery, URI, SWTransaction} from '@p2m2/discovery'
console.log('hello script setup')
const msg = "Something"
const config = SWDiscoveryConfiguration
                 .init()
                 .sparqlEndpoint("https://forum.semantic-metabolomics.fr/sparql/")
                 .setPageSize(5)
                 .setSizeBatchProcessing(10)
                 .setLogLevel("debug")
                 .setCache(false);

const disco = SWDiscovery(config).something("h1").select("h1").commit().raw();
</script>

<template>
  <div>{{ disco }}</div>
</template>