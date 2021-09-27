// ECMAScript modules
import { info } from "./module.mjs";
import { log } from "./module.js";
// info("Hi ECMAScript modules");
log("Hi CommonJS modules");

//Основное отличие:
// CommonJS modules - синхронные
// ECMAScript modules - асисинхронные async... await
// * - под нодой не юзать CommonJS не понимают "*"
