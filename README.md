
# StudioOnze Projeto

Projeto Feito para vaga no estudio de fotografia Studio Onze

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

-   [Node.js](https://nodejs.org/) - Necessário para executar o frontend React.
-   [PHP](https://www.php.net/) - Necessário para executar o backend Laravel.
-   [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional. Siga as instruções no site oficial para instalação.

## Instalação

1.  **Clonando o Repositório**
    
    Clone o repositório `studioonze-projeto` para o seu ambiente local usando o Git:
    
    ```bash
    git clone https://github.com/felpsgus/studioonze-projeto.git
    ```
    
2.  **Configurando o Backend (Laravel)**
    
    -   Na raiz do projeto, acesse o diretório do projeto Laravel:
        
        ```bash
        cd api
        ```
        
    -   Instale as dependências do Composer:
        
        ```bash
        composer install
        ```
        
    -   Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`:
        
        ```bash
        cp .env.example .env
        ```
        
    -   Gere a chave da aplicação Laravel:
        
        ```bash
        php artisan key:generate
        ```
        
    -   Gere a chave do JWT:
        
        ```bash
        php artisan jwt:secret
        ```
        
    -   Configure seu arquivo `.env` com as informações do banco de dados PostgreSQL.

	-    **Exemplo de configuração do banco de dados**

			Adicione as seguintes linhas ao arquivo `.env` para configurar o banco de dados PostgreSQL:

			```DB_CONNECTION=pgsql 
			DB_HOST=localhost 
			DB_PORT=5432 
			DB_DATABASE=laravel 
			DB_USERNAME=postgres 
			DB_PASSWORD=password
			```

			Substitua `localhost`, `5432`, `laravel`, `postgres` e `password` pelos valores apropriados para sua configuração.
        
    -   Execute as migrações para criar as tabelas no banco de dados:
        
        ```bash
        php artisan migrate
        ```
        
    -   Configure o armazenamento local para as imagens
        
        ```bash
        php artisan storage:link
        ```
        
3.  **Configurando o Frontend (React)**
    
    -   Na raiz do projeto, acesse o diretório do projeto React:
        
        ```bash
        cd web
        ```
        
    -   Instale as dependências do npm:
        
        ```bash
        npm install
        ```
        
4.  **Executando o Projeto**
    
    -   Para iniciar o servidor Laravel, dentro do diretório `api`, execute:
        
        ```bash
        php artisan serve
        ```
        
        O backend estará disponível em `http://localhost:8000`.
        
    -   Para iniciar o servidor de desenvolvimento do React, dentro do diretório `web`, execute:
        
        ```bash
        npm start
        ```
        
        O frontend estará disponível em `http://localhost:3000`.
        

Agora você pode acessar a aplicação em seu navegador e começar a usá-la!

----------
**Links úteis**

-   Instalação do Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
-   Instalação do PHP: [https://www.php.net/manual/pt_BR/install.php](https://www.php.net/manual/pt_BR/install.php)
-   Instalação do PostgreSQL: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
