const Entidade = require("./src/models/Entidade");
const Rodeio = require("./src/models/Rodeio");
const Resultado = require("./src/models/Resultado");

const entidades = [
  {
    nome: "CTG Tiarayú",
    cidade: "Porto Alegre",
    rt: 1
  },
  {
    nome: "CTG M'Bororé",
    cidade: "Campo Bom",
    rt: 30
  },
  {
    nome: "CPF Piá do Sul",
    cidade: "Santa Maria",
    rt: 13
  },
  {
    nome: "CTG Aldeia dos Anjos",
    cidade: "Porto Alegre",
    rt: 1
  },
  {
    nome: "CTG Rancho da Saudade",
    cidade: "Cachoeirinha",
    rt: 1
  },
  {
    nome: "DTG Poncho Verde",
    cidade: "Panambi",
    rt: 9
  }
];

const rodeios = [
  {
    nome: "XXI Sarau de Arte Gaúcha",
    data: new Date(2019, 06, 09, 0, 0, 0, 0),
    entidade: { nome: "CTG M'Bororé" }
  }
];

const resultados = [
  {
    rodeio: { nome: "XXI Sarau de Arte Gaúcha" },
    modalidade: "Danças Tradicionais Adulto - Força A",
    dados: [
      {
        entidade: { nome: "CTG Tiarayú" },
        correcao: 9,
        harmonia: 11.7,
        interpretacao: 23.722,
        musica: 3,
        desconto: 0
      }
    ]
  }
];

//==================================================
// FUNCAO PARA LIMPAR DB
//==================================================
async function cleanDB() {
  await Entidade.remove({});
  console.log("-> Coleção ENTIDADE removida.");

  await Rodeio.remove({});
  console.log("-> Coleção RODEIO removida.");

  await Resultado.remove({});
  console.log("-> Coleção RESULTADO removida.");
}

//==================================================
// FUNCAO PARA CADASTRAR DADOS
//==================================================

async function cadastraItens() {
  //CRIA ENTIDADES
  const mapEntidades = async () => {
    entidades.map(async entidade => {
      const newEntidade = await Entidade.create(entidade);
      await newEntidade.save();
      return console.log(`-> Entidade '${newEntidade.nome}' cadastrada.`);
    });
  };

  //CRIA RODEIOS
  const mapRodeios = async () => {
    rodeios.map(async rodeio => {
      const newRodeio = await Rodeio.create(rodeio);
      const foundEntidade = await Entidade.findOne({
        nome: rodeio.entidade.nome
      });
      newRodeio.entidade.id = foundEntidade._id;
      await newRodeio.save();

      const newRodeioData = {id: newRodeio._id, nome: newRodeio.nome };

      foundEntidade.rodeios.push(newRodeioData);
      foundEntidade.save();

      return console.log(`-> Rodeio '${newRodeio.nome}' cadastrado.`);
    });
  };

  //CRIA RESULTADOS
  const mapResultados = async () => {
    resultados.map(async resultado => {
      const newResultado = await Resultado.create(resultado);

      //calcula nota FINAl para cada entrada
      newResultado.dados.map(entrada => {
        const { correcao, harmonia, interpretacao, musica, desconto } = entrada;
        return entrada.final = correcao + harmonia + interpretacao + musica - desconto;
      });

      //Adiciona o ID do RESULTADO na ENTIDADE localizada
      newResultado.dados.map(async entrada => {
        const foundEntidade = await Entidade.findOne({nome: entrada.entidade.nome});
        foundEntidade.resultados.push(newResultado._id);
        return await foundEntidade.save();
      });

      //Adiciona o ID da ENTIDADE na entrada correspondente a ela
      newResultado.dados.map(async entrada => {
      const foundEntidade = await Entidade.findOne({nome: entrada.entidade.nome});
      return entrada.entidade.id = foundEntidade._id;
      })

      //adiciona o ID do RESULTADO no RODEIO correspondente
      const foundRodeio = await Rodeio.findOne({ nome: resultado.rodeio.nome });
      foundRodeio.resultado.push(newResultado._id);
      await foundRodeio.save();

      //adiciona o ID do RODEIO para o resultado
      newResultado.rodeio.id = foundRodeio._id;

      await newResultado.save();

      return console.log(
        `-> Resultado '${newResultado.modalidade}' adicionado para o rodeio '${newResultado.rodeio.nome}'.`
      );
    });
  };
  await mapEntidades();
  await mapRodeios();
  await mapResultados();
}

module.exports = {
  async seedDB() {
    console.log("--------------------");
    console.log("Iniciando processo SeedDB");
    console.log("--------------------");
    await cleanDB();

    console.log("--------------------");
    console.log("Cadastrando ENTIDADES, RODEIOS e RESULTADOS");
    console.log("--------------------");
    await cadastraItens();
  }
};
