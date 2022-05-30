import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { router } from "./routes.ts";

const PORT = 8080;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`¡Está vivo! Se encuentra en localhost:${PORT}`);
await app.listen({ port: PORT });