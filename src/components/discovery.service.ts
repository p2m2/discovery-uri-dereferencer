
const srcDiscovery =
  "https://cdn.jsdelivr.net/gh/p2m2/discovery@0.4.1/dist/discovery-web.min.js";
declare var document: any;

/**
 * To Map inside buildDiscoverybject
 *
 * */
interface Discovery {
  SWDiscoveryConfiguration: any;
  SWDiscovery: any;
  SWTransaction: any;
  URI: any;
  Literal: any;
  PropertyPath: any;
}

export class EventDiscoveryService {
  name: string;
  value: any;

  constructor(_name: string, _value: any) {
    this.name = _name;
    this.value = _value;
  }
}

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

  static buildDiscoveryObject(): Discovery {
    return {
      SWDiscoveryConfiguration: (window as any).SWDiscoveryConfiguration,
      SWDiscovery: (window as any).SWDiscovery,
      SWTransaction: (window as any).SWTransaction,
      URI: (window as any).URI,
      Literal: (window as any).Literal,
      PropertyPath: (window as any).PropertyPath,
    };
  }

  /**
   *
   * @returns return Discovery lib as a promise
   */
  loadDiscovery(): Promise<Discovery> {
    const service = this;
    return new Promise((resolve, reject) => {
      /* the lib is already loaded */
      if (service.discovery != null) {
        resolve(service.discovery);
        return;
      }
      /* otherwise */
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = srcDiscovery;

      if (script.readyState) {
        //IE
        script.onreadystatechange = () => {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            resolve(DiscoveryService.buildDiscoveryObject());
          }
        };
      } else {
        //Others
        script.onload = () => {
          resolve(DiscoveryService.buildDiscoveryObject());
        };
      }
      script.onerror = (error: any) => {
        console.error("error", error);
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  }

  emit(event: EventDiscoveryService) {
   // this._subject.next(event);
  }
/*
  on(eventName: string, action: any): Subscription {
    return this._subject
      .pipe(
        filter((e: any) => e.name === eventName),
        map((e: EventDiscoveryService) => e["value"])
      )
      .subscribe(action);
  }
*/
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
    const d = await service.loadDiscovery();
    const SWDiscoveryConfiguration = d.SWDiscoveryConfiguration;
    const SWDiscovery = d.SWDiscovery;
    const URI = d.URI;
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

  /**
   *
   * @param cid    : Pubchem identifier
   * @param meshid  : meshid : identifiers
   * @returns number of layzy pages/listOfLazyPage
   */
  async testSparql(
    test: string,
  ): Promise<Array<any>> {
    const service = this;
    const d = await service.loadDiscovery();
    const URI = d.URI;
    const PropertyPath = d.PropertyPath;
    const Literal = d.Literal;
    const SWDiscoveryConfiguration = d.SWDiscoveryConfiguration;
    const SWDiscovery = d.SWDiscovery;
    const SWTransaction = d.SWTransaction;

    const config = SWDiscoveryConfiguration.init().sparqlEndpoint("some");

    //console.log(this.getConfiguration())

    return new Promise((resolve, reject) => {
      let swdisco: typeof SWDiscovery;

      swdisco = SWDiscovery(config);
      

      swdisco
        .prefix("dcterm", "http://purl.org/dc/terms/")
        .prefix("cid", "http://rdf.ncbi.nlm.nih.gov/pubchem/compound/")
        .prefix("cito", "http://purl.org/spar/cito/")
        .prefix("meshv", "http://id.nlm.nih.gov/mesh/vocab#")
        .prefix("mesh", "http://id.nlm.nih.gov/mesh/")
        .prefix("fabio", "http://purl.org/spar/fabio/")
        .something("cid")
        .isSubjectOf(URI("cito:isDiscussedBy"), "pmid")
        .datatype(URI("http://purl.org/dc/terms/title"), "title")
        .datatype(URI("http://purl.org/dc/terms/date"), "date")
        .isSubjectOf(
          PropertyPath(
            "fabio:hasSubjectTerm|fabio:hasSubjectTerm/meshv:hasDescriptor"
          ),
          "mesh_ini"
        )
        .isSubjectOf(
          PropertyPath(
            "meshv:treeNumber|meshv:treeNumber/meshv:parentTreeNumber"
          )
        )
        .isObjectOf(URI("meshv:treeNumber"))
        .set(URI("mesh:"))
        .focus("mesh_ini")
        .isA(URI("meshv:TopicalDescriptor"))
        .focus("mesh_ini")
        .isSubjectOf("meshv:active")
        .set(Literal(1))
        .focus("pmid")
        .isSubjectOf("dcterm:date", "dateToOrdered")
        // .console()
        .selectDistinctByPage("pmid", "title", "date")
        .then((args: Array<any>) => {
          let numberOfPages: number = Object.values(args)[0] as number;
          let lazyPage: Array<typeof SWTransaction> = Object.values(
            args
          )[1] as Array<typeof SWTransaction>;
          resolve([numberOfPages, lazyPage]);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
