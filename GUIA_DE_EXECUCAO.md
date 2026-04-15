# Guia de Execução Local do Projeto

Este documento fornece as instruções detalhadas de como executar os comandos de desenvolvimento local após você abrir o diretório do projeto na sua IDE (como VS Code, Cursor, WebStorm, etc.).

## 1. Abrir o terminal integrado na IDE

Após abrir a pasta do projeto (certifique-se de que está dentro do diretório `front-end`) na sua IDE, você precisa abrir um terminal. 

**No VS Code / Cursor:**
- Use o atalho **`` Ctrl + ` ``** (CRTL + aspas simples/crase) ou **`Ctrl + J`**.
- Alternativamente, vá no menu superior: **Terminal > New Terminal** (Novo Terminal).
- O terminal se abrirá na parte inferior da tela.

## 2. Instalar as dependências do projeto

Sempre que baixar o projeto pela primeira vez (ou caso algum colega adicione um novo pacote), é necessário baixar as dependências das quais o projeto precisa para rodar. No terminal, digite e aperte ENTER:

```bash
npm install
```
*(Esse comando lê o arquivo `package.json` e baixa tudo na pasta `node_modules/`)*

## 3. Rodar o servidor de desenvolvimento

Com as dependências instaladas, você já pode executar o site localmente para ver como ele fica ou continuar programando. Digite o seguinte comando e aperte ENTER:

```bash
npm run dev
```

## 4. Porta de Alocação do Sistema e Acesso

O ambiente do projeto é construído usando **Vite**, e por padrão, ele tentará alocar o seu sistema na porta **5173**. 
Assim que você executar o comando `npm run dev`, o seu terminal mostrará uma mensagem parecida com essa:

```txt
  VITE v5.x.x  ready in 450 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Para acessar o sistema em funcionamento:
- Escolha a URL Local apresentada (ex: `http://localhost:5173/`)
- Mantenha a tecla **`Ctrl`** pressionada e dê um clique no link direto do terminal, **OU**, copie essa URL e cole em qualquer navegador (Google Chrome, Edge, etc.).

### ⚠️ E se a porta padrão (5173) estiver ocupada?
Se você já estiver rodando outra aplicação que está usando a porta `5173`, o Vite tentará **automaticamente usar a próxima disponível**, mudando para `5174`, depois `5175`, e assim por diante. **Sempre confira no texto do seu terminal qual porta ele liberou.**

## 5. Como parar a execução

Para interromper o servidor local:
1. Clique dentro da área onde está o texto do terminal.
2. Pressione as teclas **`Ctrl + C`**.
3. Se perguntado `Terminar o arquivo em lotes (S/N)?`, digite **`S`** (Sim) e aperte ENTER.

## Resumo prático

Abriu o projeto hoje para programar?
1. Abra o terminal integrado.
2. `npm install` (garante que tudo está atualizado caso outra pessoa tenha mudado os pacotes).
3. `npm run dev`.
4. Segure o `Ctrl` e clique no link de `http://localhost:...` mostrado.
