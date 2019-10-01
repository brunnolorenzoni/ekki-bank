# ekki-bank
Full Stack exercice


## Quick Start

##### Startar o Postgres:
1. Criar a database: ekki
2. Configurar a coneção em: server/config/env.js

##### Startar o Server:
1. npm install
2. npm start

##### Adicionar database:
1. rodar os scipts que estão em sql/sql.sql na sua database

##### Startar o client:
1. npm install
2. npm start

###### Para escolher um usuario no client que está cadastrado?
Em client/src/pages:
- existe uma variavel em cada page indicando o id do usuario


#### API

##### Users

URL  | TIPO | PARAMETROS | RETORNO |
------------- | ------------- | ------------- | ------------- |
api/user/:id/ | GET | :id = id do usuario | JSON: retornar o usuario
api/user/find/cpf/ | POST | enviar por post um objeto contendo a key cpf | JSON: retornar o usuario

##### Contas
URL  | TIPO | PARAMETROS | RETORNO |
------------- | ------------- | ------------- | ------------- |
api/user/:idUser/account/ | GET | :idUser = id do usuario | JSON: retornar o a conta do usuario


##### Contatos
URL  | TIPO | PARAMETROS | RETORNO |
------------- | ------------- | ------------- | ------------- |
api/user/:idUser/contacts/ | GET | :idUser = id do usuario | JSON: retorna todo os contatos do usuario
api/user/:idUser/contact/:idContact | GET | :idUser = id do usuario; :idContact = id do contato (esse id se refere a tabela de contatos)  | JSON: retorna todo o contato requerido
api/user/:idUser/contact/add | POST | :idUser = id do usuario; enviar via post um objeto contendo a key cpf  | JSON: retorna uma message e o status da requisição
api/user/:idUser/contact/:idContact/delete/ | DELETE | :idUser = id do usuario; :idContact = id do contato (esse id se refere a tabela de contatos)  | JSON: retorna uma message e o status da requisição

##### Transfêrencias
URL  | TIPO | PARAMETROS | RETORNO |
------------- | ------------- | ------------- | ------------- |
api/transaction/ | POST | Enviar um objeto contendo as informações de valor, de quem, para quem | JSON: retorna uma message e o status da requisição
api/user/:idUser/transactions/ | GET | :idUser = id do usuario | JSON: retorna todas as transferencias daquele usuario
api/user/:idUser/transaction/:idTransaction | GET | :idUser = id do usuario; :idTransaction = id da transaction | JSON: retorna uma transferencia



###### O que falta:
  - Refatorar
