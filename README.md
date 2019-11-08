# API Site dos Rodeios (nome provisório)

Registro simples do funcionamento das rotas. API ainda não pública.

**Respostas da API**: Todas as respostas são em formato JSON.

**Retorno de Erros**: Erros retornam `status code` e um objeto JSON simples com um parâmetro `message` descritiva do erro. O erro atual não é encaminhado na resposta. Exemplo de resposta de erro:

```json
{
   "message": "Entidade já existe."
}
```

## Autenticação

Será definido uma vez que a API estiver publicizada.

## Entidades
Endpoints específicos para tratar das entidades. _Entidades_ são as organizações tradicionalistas (ou CTGs), que organizam rodeios ou participam deles como concorrentes. Em virtude da organização de rodeios, o conceito de Entidade pode ser extendido a outros órgãos que fazem estas organizações, como Prefeituras Municipais ou órgãos que não são necessariamente entidades tradicionalistas. Entidades não possuem direitos de edição, isso significa que qualquer usuário autenticado pode realizar alterações nos atributos liberados.

### Estrutura de uma Entidade

Campo | Descrição | Tipo
---|---|---
`nome` | Nome da entidade | String
`cidade` | Cidade onde a entidade fica localizada | String
`rt` | Região Tradicionalista a qual a cidade pertence | String
`usuario` | Usuário que cadastrou a entidade | ObjectID
`rodeios` | Rodeios organizados pela entidade | Array
`resultados` | Resultados obtidos nos rodeios que a entidade participou | Array
`createdAt` | Criação da entidade, contendo data e usuário que o fez | Object
`updatedAt` | Atualização da entidade, contendo data e usuário que o fez | Object

### Rotas

**`GET /entidades`**

Retorna todas as entidades cadastradas.

**`GET /entidades/:entidade_id`**

Retorna os dados específicos de uma entidade, com base no ID passado como `:entidade_id`.

**`POST /entidades`**

Cadastra uma nova entidade. Requer um usuário autenticado, que será associado à entidade através do atributo `usuario` e dentro do atributo `createdAt`. Exemplo contendo os **atributos obrigatórios** ao enviar a requisição:
```json
{
   "nome": "CTG Aldeia dos Anjos",
   "cidade": "Gravataí",
   "rt": 1
}
```
Qualquer atributo não previsto _não será adicionado_. Não informar um destes atributos retorna `status code 400`.

**`PUT /entidades/:entidade_id`**

Atualiza a entidade referenciada no ID passado como `:entidade_id`. Requer um usuário autenticado, que será associado ao atributo `updatedAt`. Os campos permitidos são os mesmos da criação, porém não são obrigatórios serem informados em conjunto.

## Rodeios

Compreende todos os rodeios cadastrados. Parâmetros cadastrados no banco de dados para cada rodeio:

- nome
- data
- organizador (id entidade)

### Rotas

**`- GET /rodeios`**<br />
Lista todos os rodeios existentes no banco de dados.<br />
**`- POST /rodeios`**:<br />
Cria um novo rodeio. É necessário passar os parâmetros `nome`, `data` (no formato Date) e `organizador`, que é o ID da entidade organizadora do evento. Obtenha o ID cadastrando uma nova ou recuperando através das rotas **Entidade**.<br />
**`- PUT /rodeios/:id_rodeio`**:<br />
Atualiza o rodeio especificado pelo ID informado na rota.<br />
