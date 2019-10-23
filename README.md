# Site dos Rodeios - API de uso

Registro simples do funcionamento das rotas. API ainda não pública.

## Autenticação

Será definido uma vez que a API estiver publicizada.

## Entidades

Compreende todas as entidades tradicionalistas cadastradas. Parâmetros cadastrados no banco de dados para cada entidade:

- nome
- cidade
- rt

### Rotas

**`- GET /entidades`**<br />
Lista todas as entidades existentes no banco de dados.<br />
**`- POST /entidades`**:<br />
Cria uma nova entidade. É necessário passar os parâmetros `nome` e `cidade`. O parâmetro `rt` será definido automaticamente com base na cidade informada.<br />
**`- PUT /entidades/:id_entidade`**:<br />
Atualiza a entidade especificada pelo ID informado na rota.<br />

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
