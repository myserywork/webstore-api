"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const GraphqlAdonis = use("ApolloServer");
const schema = require("../app/Api/graphql");

console.log(schema)

Route.route(
  "/graphql",
  ({ request, auth, response }) => {

    return GraphqlAdonis.graphql(
      {
        schema,
        context: { auth },
        formatError: (err) => {
          // Don't give the specific errors to the client.
          if (err.message.startsWith("Database Error: ")) {
            return new Error('Internal server error');
          }
          // Otherwise return the original error.  The error can also
          // be manipulated in other ways, so long as it's returned.
          return err;
        }
      },
      request,
      response
    );
  },
  ["GET", "POST"]
);

Route.get("/graphiql", ({ request, response }) => {
  return GraphqlAdonis.graphiql({ endpointURL: "/graphql" }, request, response);
});

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

// auth

Route.post("/login", "AuthController.login");

// produto
Route.resource("produto", "ProdutoController").apiOnly().middleware(["auth"]);
Route.post("imagensProduto/upload/:id", "ImagensProdutoController.upload");
Route.resource("imagensProduto", "ImagensProdutoController")
  .apiOnly()
  .middleware(["auth"]);
Route.resource("opcaoProduto", "OpcoesProdutoController")
  .apiOnly()
  .middleware(["auth"]);

// Endereco
Route.resource("endereco", "EnderecoController").apiOnly().middleware(["auth"]);

// Ordens
Route.resource("ordens", "OrdemController").apiOnly().middleware(["auth"]);
Route.resource("ordemProdutos", "OrdemProdutoController")
  .apiOnly()
  .middleware(["auth"]);
Route.resource("ordemStatus", "OrdemStatusController")
  .apiOnly()
  .middleware(["auth"]);

// Configuracoes Loja
Route.resource("configuracaoLoja", "ConfiguracoesLojaController")
  .apiOnly()
  .middleware(["auth"]);

// Usuario
Route.post("/usuario", "UsuarioController.store");
Route.resource("usuario", "UsuarioController").apiOnly().middleware(["auth"]);
