/* This file was generated by the generate-zod-schemas script */
/* DO NOT EDIT THIS FILE DIRECTLY. IT IS GENERATED FROM THE JSON SCHEMA FILES. */

import { z } from "zod"

export default z.object({ "items": z.array(z.object({ "timestamp": z.string(), "update_timestamp": z.string(), "index": z.array(z.object({ "value": z.number().int(), "timestamp": z.string() })) })), "api_info": z.object({ "status": z.string() }) })
;