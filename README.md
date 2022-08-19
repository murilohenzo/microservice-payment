# Microservice Payment
- Micro serviço vai ser responsável por fazer o registrar na base o pagamento de um boleto com status de ```PENDENTE```, onde vai ser enviado dados do pagamento do boleto para uma fila do SQS onde o [Microservice Checkout Payment](https://github.com/murilohenzo/microservice-checkout-payment) vai processar o pagamento de fato do boleto.
## UseCases
- CreateCustomer, onde vai responsável por criar um cliente fictício para a gente poder realizar o teste de pagamento de boleto onde teremos a relação de ```1 Customer -> N Payments```.
- CreatePayment, onde vai responsável por criar um pagamento de boleto com status de ```PENDENTE``` dentro da base, que vai pegar as informações relacionadas ao cliente que ta realizando o pagamento e as informações do pagamento que esta sendo criado, depois de pegar essas informações vamos fazer um producer do SQS onde vamos enviar para a fila essas informações.

    - Para isso vamos ter que criar duas filas de SQS na AWS uma com o intuito de receber os eventos de pagamentos que vai ser processado pelo [Microservice Checkout Payment](https://github.com/murilohenzo/microservice-checkout-payment). E a outra fila vai ser uma DLQ que são filas comuns, assim como as que usamos para o processamento de pagamentos, porém, utilizadas com objetivo de armazenar eventos que, por algum motivo, não foram processados com sucesso após N tentativas durante o processo de checkout do pagamento.

![Screenshot_10](https://user-images.githubusercontent.com/28688721/185530714-93fea336-7bdb-4e8a-a136-24ba041759ec.png)

## Tecnologias
NodeJS, Typescript, Postgresql, Docker, Docker Compose, AWS SQS, Nodemailer

- Foi utilizado Postgresql devido ser um banco de dados poderoso de objeto-relacional opensource, e para uma aplicação de pagamentos é bem viável utilizar um banco relacional visto que vai possuir muitas a relação entre cliente e boletos, onde temos  ```1 Customer -> N Payments```.

- O Docker Compose, possui a seguinte estrutura:
```yaml
version: '3'

services:
  db:
    container_name: payment-db
    restart: always
    build: 
      context: ./
      dockerfile: Dockerfile.db
    image: murilohenzo/postgres_db
    ports:
      - 5432:5432

  api:
    container_name: microservice-payment
    build: 
      context: ./
      dockerfile: Dockerfile
    image: murilohenzo/microservice-payment
    entrypoint: dockerize -wait tcp://db:5432 -timeout 30s 
    depends_on:
      - db
    command: yarn dev
    ports:
      - 3333:3333
    links:
      - db
```

### Como testar?

1. [Instalar Docker Compose](https://docs.docker.com/compose/install/)
2. Clonar este repo com ssh
3. Criar um ```.env``` para as seguintes enviroments, com as variáveis criadas por você
   - Uma observação, o email para teste deve ser um ```hotmail```
    ```.env 
      AWS_USER_SECRET_ACCESS_KEY=
      AWS_USER_KEY=
      AWS_REGION_SQS=
      AWS_ARN_POLICY=
      AWS_SQS_URL=
      NODEMAILER_USER=
      NODEMAILER_PASS=
    ```
4. Rodar todos os containers com `docker-compose up ou docker-compose up -d`
5. Outra alternativa fazendo `make build` para buildar os containers.
6. Rodar o projeto do [Microservice Checkout Payment](https://github.com/murilohenzo/microservice-checkout-payment)
7. Endpoints para cadastro de cliente e pagamento 

```yaml
- customers
http://localhost:3333/customers

{
	"name": "Murilo Teste",
	"age": 27,
	"cpf": "12345678904",
	"balance": 1000.00,
	"sex": "MALE",
	"email": "murilohezo@gmail.com"
}

- http://localhost:3333/payments
{
	"billet": "026500000011323116990009002022153320476101001068",
	"amount": 50,
	"cashback": 5,
	"customer_id": "12e5ec64-b3ef-4b41-a03f-22e059adbc77"
}
```

8. Observação, existe linhas comentadas dentro do ```Dockerfile.dev``` e ```docker-compose.yaml```, que caso esteja em um SO do Linux podem ser descomentadas dessa forma ira rodar o dockerizer que ira esperar o container do banco startar, para depois startar o service de pagamentos. Caso esteja no SO do Windows recomendo, startar o service do docker-compose primeiramente do banco e depois do micro service para evitar problemas de conexao com o container do banco de dados.
