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
Lista todas as entidades existentes no banco de dados. É possível passar parâmetros para busca, especificando um ou mais dos três parâmetros listados acima.<br />
**`- POST /entidades`**:<br />
Cria uma nova entidade. É necessário passar os parâmetros `nome` e `cidade`. O parâmetro `rt` será definido automaticamente com base na cidade informada.<br />
**`- PUT /entidades/:id_entidade`**:<br />
Atualiza a entidade especificada pelo ID informado na rota.<br />
