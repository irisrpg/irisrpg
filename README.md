## Iris RPG [![Build Status](https://travis-ci.org/irisrpg/irisrpg.svg?branch=master)](https://travis-ci.org/irisrpg/irisrpg)

Iris é um sistema feito para RPG's onlines(Como Dungeons & Dragons, Tormenta 3D&T e outros).
Ele conta com um sistema de criação de personagens, loja de itens, salas de encenações, sistema de quest e muitos outros!

## Instalação

A instalação do sistema iris é bem simples. Cláro você vai precisar de um domínio para poder hostear tudo.

### Prerequisitos

Para poder usar o Iris, você precisa ter:

- **Node.js:** `>=12.6.0` and **npm:** `>=6.11.1`
- **Servidor De Banco De Dados(MySQL, MariaDB, PostgreSQL ou Microsoft SQL)[Opcional, no caso de nenhum disponível Iris irá usar um banco de dados SQLite interno.]**

### Instalação

A instalação é bem simples.

#### Back-End

Na pasta `server`, execute estes comandos:

```bash
$ npm install # Instala depencências
$ npm install -g sequelize-cli # Instala CLI do Sequelize
```

Altere o arquivo `database/config/config.json` para que tenha as configurações do seu servidor de banco de dados(caso tenha um).

> Nota: Apenas o `production` precisa ser alterado, o `development` e `test` devem ser alterados apenas se for desenvolver o iris.

Agora execute os seguintes comandos:

```bash
$ sequelize db:migrate # Para inicializar o banco de dados
$ sequelize db:seed:all # Para adicionar as informações iniciais para poder começar a usar
```

Agora crie um arquivo `.env` (veja o arquivo `.env.example` para exemplo) e altere o `JWT_SECTRET`(Necessário) e o `NODE_PORT`(opcional, caso não queira na porta `3000`) a gosto.

### Front-End

Na pasta `client`, crie um arquivo `.env` (veja o arquivo `.env.example` para exemplo) e altere o `SERVER_URL` para o caminho onde está hosteando o Back-End(exemplo: `http://127.0.0.1:3000`).

Agora execute os seguintes comandos:

```bash
$ npm install # Instala depencências
$ NODE_ENV=production npm run build # Compila uma build de produção
```

Agora copie o conteúdo da pasta `dist` para o diretório root do seu servidor Apache/Nginx/Outros.


## Executando os testes

Levando em consideração que:
- As dependencias já estão instaladas
- O servidor de banco de dados está operando(no caso de estar usando um)
- Os arquivos `server/.env`,`server/database/config/config.json` e `client/.env` estão configurados

Basta apenas executar os comandos:
```bash
$ npm install -g mocha # Instala o mocha globalmente
$ npm test # Executa os testes
```

## Feito com:

* [Express](https://expressjs.com/) - Framework usada no Back-End
* [Vue.js](https://vuejs.org/) - Framework usada no Front-End
* [CoreUI](https://coreui.io/) - Dashboard usado no Front-End
* [Sequelize](https://sequelize.org/) - Comunicação com banco de dados
* [Mocha](https://mochajs.org/) - Framework para unidades de testes

## Contribuindo

Por favor leia o arquivo [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) para detalhes de nosso código de conduta e o processo de enviar um `pull request` para o projeto. Toda ajuda é muito bem vinda!

## Versões

Utilizamos o padrão [SemVer](http://semver.org/) para controle de número de versões. Para ver as versões disponívels, veja [releses](https://github.com/irisrpg/irisrpg/releases). 

## Authors

* **Akatsuki Levi** - *Trabalho inicial* - [AkatsukiLevi](https://github.com/akatsukilevi)

Também veja a lista de [Contribuições](https://github.com/irisrpg/irisrpg/contributors) para mais informações de quem colaborou com o projeto

## Licença

Este projeto está licenciado com a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.