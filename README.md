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

Endpoints específicos para tratar das entidades. _Entidades_ são as organizações tradicionalistas (ou CTGs), que organizam rodeios ou participam deles como concorrentes. Em virtude da organização de rodeios, o conceito de Entidade pode ser estendido a outros órgãos que fazem estas organizações, como Prefeituras Municipais ou órgãos que não são necessariamente entidades tradicionalistas. Entidades não possuem direitos de edição, isso significa que qualquer usuário autenticado pode realizar alterações nos atributos liberados.

### Estrutura de uma Entidade

| Campo        | Descrição                                                  | Tipo     |
| ------------ | ---------------------------------------------------------- | -------- |
| `nome`       | Nome da entidade                                           | String   |
| `cidade`     | Cidade onde a entidade fica localizada                     | String   |
| `rt`         | Região Tradicionalista a qual a cidade pertence            | String   |
| `usuario`    | Usuário que cadastrou a entidade                           | ObjectID |
| `rodeios`    | Rodeios organizados pela entidade                          | Array    |
| `resultados` | Resultados obtidos nos rodeios que a entidade participou   | Array    |
| `createdAt`  | Criação da entidade, contendo data e usuário que o fez     | Object   |
| `updatedAt`  | Atualização da entidade, contendo data e usuário que o fez | Object   |

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

Endpoints específicos para tratar dos rodeios. São considerados _Rodeios_ os eventos organizados por Entidades, onde estas mesmas entidades podem participar como concorrentes nas diversas modalidades existentes. Cada Rodeio é propriedade de um usuário e, diferente das entidades, somente este usuário pode fazer alterações. **Importante**: _Rodeio_ é separado dos _Resultados_, considerando que um rodeio aceita mais do que um resultado. As rotas de Rodeios referem-se somente aos dados básicos do rodeio, não ao resultado em si.

### Estrutura de um Rodeio

| Campo       | Descrição                                                               | Tipo     |
| ----------- | ----------------------------------------------------------------------- | -------- |
| `nome`      | Nome do rodeio                                                          | String   |
| `data`      | Data em que o rodeio ocorreu                                            | Date     |
| `usuario`   | Usuário que cadastrou o rodeio                                          | ObjectID |
| `entidade`  | Entidade que organizou o rodeio                                         | Object   |
| `resultado` | Listagem das notas das entidades participantes, dividido por modalidade | Array    |
| `createdAt` | Data de criação do rodeio                                               | Date     |
| `updatedAt` | Data da última atualização do rodeio                                    | Data     |

### Rotas

**`GET /rodeios`**

Retorna todos os rodeios cadastrados no sistema. Limite de 8 rodeios por página.

**`GET /rodeios/:rodeio_id`**

Retorna os dados específicos de um rodeio, com base no ID passado como `:rodeio_id`.

**`POST /rodeios/`**

Cadastra um novo rodeio. Requer um usuário autenticado, que será associado ao rodeio através do atributo `usuario` e dentro do atributo `createdAt`. O ID gerado para o rodeio será automaticamente adicionado ao array `rodeios` da Entidade que for informada no atributo `organizador`. Exemplo contendo os **atributos obrigatórios** ao enviar a requisição:

```json
{
  "nome": "XXI Sarau da Arte Gaúcha",
  "data": "2019-06-09",
  "organizador": {
    "id": "123456789123456789",
    "nome": "CTG M'Bororé"
  }
}
```

Qualquer atributo não previsto _não será adicionado_. Não informar um destes atributos retorna `status code 400`.

**`PUT /rodeios/:rodeio_id`**

Atualiza o rodeio referenciada no ID passado como `:rodeio_id`. Requer um usuário autenticado, que será associado ao atributo `updatedAt` e deve ser o mesmo usuário que cadastrou o rodeio, do contrário a alteração dos dados não será autorizada. Os campos permitidos são os mesmos da criação, porém não são obrigatórios serem informados em conjunto.

**`DELETE /rodeios/:rodeio_id`**

Permite a exclusão do rodeio referenciado no ID passado como `:rodeio_id`. Requer um usuário autenticado que deve ser o mesmo usuário que cadastrou o rodeio, do contrário a exclusão não será autorizada. Ao excluir o rodeio, ele será _removido do banco de dados_, portanto não há retorno. Junto com ele todos os resultados que pertencem ao rodeio serão removidos, bem como seu ID será removido da entidade organizadora.
