# User management API
uma API REST de gerenciamento de usuarios construida com JavaScript e TypeScript, seguindo os principios do solid.

## Dependências

1. Node.js 16.16

## Passo a passo

1. instalar as dependências
~~~ 
    npm i -save
~~~ 
2. criar o arquivo **.env** na raiz do Projeto e configurar as variáveis de ambiente
~~~ 
    HOST=localhost
    PORT=3000
~~~
3. rodar o projeto
~~~
    npm start
~~~

## Como testar as rotas com o Swagger

**1º** Com o projeto rodando entre na URL:
```
http://localhost:3000/api-docs
```
**2º** Criar o Administrador:
1. Na rota
```
POST "/login/new"
```
2. Clicar em **Try it out** localizado no canto superior direito.
3. Agora clique em **“Execute”**. Pronto o administrador foi criado

**3º** Logar com o Administrador
1. Na rota
```
POST "/login"
```
2. Clicar em **Try it out** localizado no canto superior direito.
3. Agora clique em **“Execute”**.
4. Como resposta terá o **“token”** no Header.

**4º** Autorizar as rotas
1. Copie o token gerado e coloque no **“Authorize”**
2. Pronto você já pode testar todas as rotas

**5º** Quando o token expirar
1. repita o 3º e o 4º passo
