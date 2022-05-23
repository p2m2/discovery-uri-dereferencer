<script lang="ts" setup>

import { DiscoveryService } from './discovery.service'


console.log('hello script setup')
const msg = "Something"
const config = DiscoveryService
/*
const config = SWDiscoveryConfiguration
                 .init()
              //   .sparqlEndpoint("https://forum.semantic-metabolomics.fr/sparql/")
                 .setPageSize(5)
                 .setSizeBatchProcessing(10)
                 .setLogLevel("debug")
                 .setCache(false);

const disco = SWDiscovery(config).something("h1").select("h1").commit().raw();*/
</script>

<template>
  <div>{{ config.toString() }}</div>
</template>