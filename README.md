<p align="center">
  <img width="300em" height="300em" src="https://sm-drag-and-drop.vercel.app/assets/img/logo.png">
</p>


<h3 align="center">🚧 Software em construção 🚧</h3>
<p align="center">
  <img width="auto" height="23em" src="https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E" >
  <img width="auto" height="23em" src="https://img.shields.io/badge/-TypeScript-323330?style=flat&logo=TypeScript">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Node.js-323330?style=flat&logo=Node.js&logoColor=white">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Express.js-323330?style=flate">
  <img width="auto" height="23em" src="https://img.shields.io/badge/PostgreSQL-323330?style=flate&logo=postgresql&logoColor=white">
</p>

# Sumario 
* [Sobre](#sobre)
* [Pré-Requisito](#pré-requisito)
* [Executando o projeto](#executando-o-projeto)
  * <a href="#downCod">Baixando e configurando o código</a> 
  * <a href="#execAmbDev">Executando Ambiente de desenvolvimento</a>
  * <a href="#execTest">Executando Testes</a>
* [Build](#build)
* [Documentação](#documentação)
* [Tecnologias](#tecnologias)
* [Autores](#autores)

<br> 

___
# Sobre

<br> 
<p align="justify"> Inicialmente um projeto para disciplina Software Educacional, mas a ideia evoluiu e virou meu trabalho de TCC(trabalho de conclusão de curso), a ideia é desenvolver um simulador drag and drop (arrastar e soltar) com temática de montagem e manutenção em computadores. Desta maneira foi desenvolvido um sistema web, para ser de fácil acesso e funcional independente da plataforma, mas até o momento a versão mobile do site não está funcional.</p>
<p align="justify">Para acessar e testar o simulador basta clicar neste <a href="https://sm-drag-and-drop.vercel.app/" target="_blank">link</a></p>

<p align="center">
  <img width="auto" height="200em" src="https://raw.githubusercontent.com/araujo21x/SM-Computadores/main/assets/img/GitHubImgReadme/smComp01.png">
  <img width="auto" height="200em" src="https://raw.githubusercontent.com/araujo21x/SM-Computadores/main/assets/img/GitHubImgReadme/smComp02.png">
  <img width="auto" height="200em" src="https://raw.githubusercontent.com/araujo21x/SM-Computadores/main/assets/img/GitHubImgReadme/smComp03.png">
  <img width="auto" height="200em" src="https://raw.githubusercontent.com/araujo21x/SM-Computadores/main/assets/img/GitHubImgReadme/smComp04.png">
  <img width="auto" height="200em" src="https://raw.githubusercontent.com/araujo21x/SM-Computadores/main/assets/img/GitHubImgReadme/smComp05.png">
</p>

<p align="justify">
A primeira imagem(canto superior esquerdo) é a tela inicial, nela possui dois botões, cada um para acessar a simulação de acordo com o modo desejado, que são:
Simulador - Treino = Nesse modo o sistema auxilia com algumas instruções e mensagens de erros sobre a conexão das peças e proibindo a montagem de um computador com peças que não funcionam.
</p>
<p align="justify">
Simulador - Avaliativo = Nesse modo o sistema não auxilia e todos os erros são salvos guardados, quando o aluno gera o relatório, um com os erros vai para o email do professor e outro apenas com informações da peça é gerado para o aluno baixar.
</p>
<p align="justify">
A segunda imagem (canto superior direito) é a tela inicial de simulação sem nenhuma peça, nela apenas a aba de placa mãe está liberada(em azul) e o restante bloqueada(em vermelho). Desta maneira a pessoa coloca a placa mãe e é liberada todas as abas menos a do cooler, pois para liberar é necessário colocar o processador. Desta maneira vamos para a imagem 3 (canto inferior esquerdo) onde temos um computador com a primeira memória, processador, cooler e placa  mãe. o aluno também já fez a parte de cabeamento do cooler.
</p>
<p align="justify">
Na iamgem 4  (canto inferior direito) temos o modo avaliação, ao contrário da imagem 3 não tem borda rosa e não aparece as mensagens de erros, entre outros auxílios do sistema.
</p>
<p align="justify">
Quando vai para adição de peças que se encaixam no gabinete e não na placa mãe a imagem do simulador muda para a imagem 5 (última imagem, que está centralizada) e a mesma mudança ocorre quando volta para aba de alguma peça que se encaixa na placa mãe.
</p>
<p align="justify">
Caso a pessoa feche o navegador não tem problema, quando acessar a página e o modo de jogo que estava anteriormente o sistema vai retornar do ponto que estava.
</p>

---
# Pré-Requisito

<br> 

  Você vai precisar ter instalado em sua máquina as seguintes ferramentas:

  * [NojeJS](https://nodejs.org/en/) (Pelo menos versão 14.15 ou superior): Runtime de JS no servidor;
  * [PostgreSQL](https://www.postgresql.org/): Banco de dados utilizado no projeto;
  * [yarn](https://yarnpkg.com/): Gerenciador de pacote;
  * [Nodemon](https://nodemon.io/) (ferramenta para ambiente de desenvolvimento): Uma maneira da API atualizar sozinha sem precisar reiniciar.

<br> 

---
# Executando o projeto

<h2 align="center">Baixando e configurando o código <a name="downCod"></a></h2>

<br> 

<strong>1 - </strong>  Clone este repositório:

```bash
$ git clone https://github.com/araujo21x/API_SM_Computadores.git
```

<strong>2 - </strong>  Acesse a pasta do projeto no terminal/cmd:
```bash
$ cd API_SM_Computadores/
```

<strong>3 - </strong>  Instale as dependências do projeto:
```bash
$ yarn install
```

<strong>4 - </strong> Configurando as variáveis de ambiente (ambiente produção = .env)

1. Crie uma copia do arquivo exemple.env;

2. Modifique o nome dessa copia para .env;

3. O arquivo .env vai ter descrições de como preenchê-lo.
```
Não utilize os dados do ambiente de produção(.env) no ambiente de desenvolvimento (.env.test).
```

<strong>5 - </strong>  Configurando as variáveis de ambiente (ambiente desenvolvimento = .env.test)

1. Crie uma copia do arquivo exemple.env;

2. Modifique o nome dessa copia para .env.test;

3. O arquivo .env.test vai ter descrições de como preenchê-lo. 

```
Não utilize os dados do ambiente de produção(.env) no ambiente de desenvolvimento (.env.test).
```

<h2 align="center">Executando <br> ---- Ambiente de desenvolvimento ---- <a name="execAmbDev"></a></h2>

<br> 

<strong> 1 - </strong> Comando para rodar o projeto, no ambiente de desenvolvimento:
```bash
$ yarn dev
```

<h2 align="center">Executando <br> ---- Testes ---- <a name="execTest"></a></h2>

<br> 

<strong> 1 - </strong> Comando para rodar os testes:
```
OBS: CUIDADO!!!
* CUIDADO!!! Este comando é configurando para limpar o banco de dados, fazer upload de imagens e fazer o insert de todos os dados necessário para rodar os testes.
* CUIDADO!!! O teste está configurado para rodar no ambiente de desenvolvimento por padrão, não mude isso.
```

```bash
$ yarn test
```

<br> 

___
# Build


<br> 

O código está em <strong>TypeScript</strong>, mas somente para o desenvolvimento. Dessa maneira será necessario fazer o <strong>build</strong> em alguns momento, por exemplo, quando for fazer deploy. Build é o processo de transforma o código de <strong>TypeScript</strong> para <strong>JavaScript</strong>. 
<br> <p>Os servidores já estão configurados para fazer o build de maneira automática, mas caso necessite fazer os comandos são esses:.</p>

1. Buildar:
```bash
$ yarn build
```
2. Rodar o projeto <strong>JavaScript</strong>:
```bash
$ yarn start
```

<br> 

___
# Documentação 

___
# Tecnologias 

<br> 

- [Express](https://expressjs.com/pt-br/): Framework para NodeJS;
- [JestJS](https://jestjs.io/pt-BR/)(dev): Ferramenta para teste
- [Supertest](https://www.npmjs.com/package/supertest)(dev): Ferramenta para teste
- [Nodemon](https://nodemon.io/)(dev): Uma maneira da API atualizar sozinha sem 
precisar reiniciar no ambiente de desenvolvimento;
- [TypeScript](https://www.typescriptlang.org/)(dev): Superset para JS;
- [ESLint](https://eslint.org/)(dev): Ferramenta para patronizar o código;
- [Cloudinary](https://cloudinary.com/): Serviço de armazenamento da para imagem;
- [Compression](https://www.npmjs.com/package/compression): Serve para comprimir 
as resposta da API;
- [Typeorm](https://typeorm.io/#/): ORM para NodeJS;
- [pg](https://www.npmjs.com/package/pg): Dependência para lidar com o banco
- [Nodemailer](https://nodemailer.com/about/): Serviço para envio de e-mail;
- [dotenv](https://www.npmjs.com/package/dotenv): Variável ambiente;
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JWT, autenticação;
- [multer](https://www.npmjs.com/package/multer): Serviço trabalhar com imagem enviado para o servidor;
- [helmet](https://www.npmjs.com/package/helmet): Ajuda na segurança da aplicação configurando o cabeçalho http da resposta da API;
- [cors](https://www.npmjs.com/package/cors): Habilitar o cors.

### Veja o arquivo [package.json](https://github.com/araujo21x/API_SM_Computadores/blob/master/package.json)

<br> 

___
# Autores 

<br> 

## Lucas de Araujo Cirqueira:
* [GitHub](https://github.com/araujo21x);
* [LinkedIn](https://www.linkedin.com/in/lucas-araujo-cirqueira-a1402519b/)
