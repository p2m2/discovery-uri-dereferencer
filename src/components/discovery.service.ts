import "@p2m2/discovery" ;


export class DiscoveryService {
  
  public url = "https://forum.semantic-metabolomics.fr/sparql/";
  mimetype = "application/sparql-query";
  method = "POST";
  cache = true;
  logLevel = "info";
  batchProcessing = 80;
  pageSize = 10;
  discovery = null;

  constructor() {}


  getConfiguration(): string {
    return (
      `{
        "sources" : [{
        "id"  : "__id__",\n` +
      `"url" : "` +
      this.url +
      `",\n` +
      `"method" : "` +
      this.method +
      `",\n` +
      `"mimetype" : "` +
      this.mimetype +
      `"` +
      `}],
        "settings" : {
            "cache" : ` +
      this.cache +
      `,
            "logLevel" : "` +
      this.logLevel +
      `",
            "sizeBatchProcessing" :  ` +
      this.batchProcessing +
      `,
            "pageSize" : ` +
      this.pageSize +
      `
        }
    }`
    );
  }

  async toString() : Promise<string> {
    const service = this;
    const config = SWDiscoveryConfiguration.init().sparqlEndpoint("https://peakforest.semantic-metabolomics.fr/sparql");
    console.log("-- ok --")
    return new Promise((resolve, reject) => {
      SWDiscovery(config)
       .prefix("owl","http://www.w3.org/2002/07/owl#")
       .something("h")
       .isA(URI("owl:Class"))
       .console()
       .select("h")
       .commit().raw()
        .then((args: Array<any>) => {
            console.log("RES =======================")
            console.log(args)
            resolve(JSON.stringify(args))
        })
        .catch((error: any) => {
          console.log("ERR =======================")
          console.log(error)
          reject(error);
        });
        });
  };

}
