# Shopper Rides

A Shopper Rides é uma aplicação fullstack que permite que o usuário possa solicitar uma viagem em carro particular de um ponto A até um ponto B. Ele poderá escolher entre algumas opções de motoristas e valores e confirmar a viagem. Depois também poderá listar o histórico das viagens realizadas.

## Rodando a aplicação com Docker

Este projeto utiliza Docker para facilitar a execução da aplicação em um ambiente isolado e consistente. Siga as instruções abaixo para configurar e rodar a aplicação com Docker.

*Pré-requisitos:*

* Docker: Certifique-se de ter o Docker instalado e em execução na sua máquina.
* Docker Compose:  Verifique se o Docker Compose também está instalado.

*Passos:*

1. *Clonar o repositório:*

   bash
   git clone <URL_DO_REPOSITORIO>
   

2. *Construir as imagens:*

   Navegue até o diretório raiz do projeto e execute o seguinte comando para construir as imagens do backend e do frontend:

   bash
   docker-compose build
   

3. *Subir os containers:*

   Após construir as imagens, execute o seguinte comando para iniciar os containers em segundo plano:

   bash
   docker-compose up -d
   

4. *Acessar a aplicação:*

   A aplicação estará disponível nos seguintes endereços:

   * *Frontend:* http://localhost
   * *Backend:* http://localhost:8080 (se precisar acessar diretamente)

*Parar os containers:*

Para parar os containers, execute o seguinte comando:

bash
docker-compose down


*Observações:*

* *Variáveis de ambiente:* Se a sua aplicação utiliza variáveis de ambiente, defina-as no arquivo .env na raiz do projeto ou diretamente no arquivo docker-compose.yml.
* *Logs:* Para visualizar os logs dos containers, utilize o comando docker logs <nome_do_container>.
* *.dockerignore:* Utilize um arquivo .dockerignore para evitar que arquivos desnecessários sejam copiados para o container, otimizando o processo de build.


## Endpoints da API

### [POST] /ride/estimate

* Recebe a origem e o destino da viagem e realiza os cálculos dos valores da viagem.
* Dados necessários:
    * customer_id
    * origin
    * destination

### [PATCH] /ride/confirm

* Confirma a viagem e a grava no histórico.
* Dados necessários:
    * customer_id
    * origin
    * destination
    * distance
    * duration
    * driver: {id, name}
    * value

### [GET] /ride/{customer_id}

* Lista as viagens realizadas por um determinado usuário.
* Parâmetros opcionais:
    * driver_id: filtra as viagens pelo ID do motorista.


## Estrutura do projeto


├── backend
│   └── ...
└── frontend
    └── ...


*Exemplo de arquivo .env:*


GOOGLE_API_KEY=SUA_CHAVE_DE_API_AQUI


*docker-compose.yml:*

yaml
version: "3.9"
services:
  frontend:
    build: ./frontend 
    ports:
      - "80:80"  
    depends_on:
      - backend  

  backend:
    build: ./backend  
    ports:
      - "8080:8080"  
    environment:
      - GOOGLE_API_KEY=${GOOGLE_API_KEY} 


*Comandos úteis:*

* docker system prune -a: Limpa o cache do Docker.
* docker ps: Lista os containers em execução.
* docker images: Lista as imagens Docker.
* docker exec -it <nome_do_container> bash: Acessa o terminal do container.