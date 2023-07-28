# Pass_nger 🔒👩🏻‍💼

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

> Aplicação voltada ao gerenciamento de senhas, tanto de cartão quanto suas contas na rede.

## 📚 Bibliotecas utilizadas

**bcrypt:** para criptografia hash do registro de usuários.

**cookie-parser:** middleware analisador de cookies.

**cors:** permite habilitar solicitações entre sites.

**jwt:** gera token jwt.

**bootstrap:** componente de interface.

**styled components:** criação de componentes.

### 🦾 Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas para as seguintes tarefas:

- [x] Implementar login
- [ ] Validar força da senha
- [ ] Toogle do campo senha
- [ ] Contexto de autenticação
- [ ] Edição e deleção de credenciais pela interface
- [ ] Deploy

## 👣 Pré requisitos

- Confira a versão do node.js instalada.
  Versão do projeto: v16.14.2
- Veja se possui instalado o mySQL Workbench ou similar.

## 🚀 Execução

Para executar Pass_nger, siga estas etapas:

1. Clone este repositório.
2. Abra e execute o arquivo sql (server/dbpm.sql) dentro do mySQL Workbench.
3. Abra pasta raiz no VScode.
4. Entre na pasta dedicada a front-end.

```
cd client
```

4. Instale dependências de client.

```
npm install
```

5. Execute aplicação web.

```
npm start
```

6. Abra outro terminal.

7. Cheque se está na pasta raiz. Se não, vá até ela.

```
cd ..
```

8. Entre na pasta dedicada a back.

```
cd server
```

9. Instale dependências de server.

```
npm install
```

10. Execute API da aplicação.

```
npm start
```

11. O projeto está rodando 🎉

## 🤫 .env

SERVER_PORT=3001

USER='root'

HOST=http://localhost:3000

PASSWORD='password'

DATABASE='passwordmanager'

## 📝 Licença

[MIT](https://choosealicense.com/licenses/mit/)
