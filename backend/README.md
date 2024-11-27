# Shopper Rides
A Shopper Rides é uma aplicação fullstack que permite que o usuário possa solicitar uma viagem em carro particular de um ponto A até um ponto B. Ele poderá escolher entre algumas opções de motoristas e valores e confirmar a viagem. Depois também poderá listar o histórico das viagens realizadas.

## Acessando o frontend e instalando dependências
```bash
# Para acessar
cd frontend/

# Caso use npm
npm i

# Caso use yarn
yarn
```

## Rodando a aplicação localmente (dentro da pasta 'frontend')
```bash
# caso use npm
npm run dev

# caso use yarn
yarn dev
```

## Acessando o backend e instalando dependências
```bash
# Para acessar
cd backend/

# Caso use npm
npm i

# Caso use yarn
yarn
```

## Rodando a aplicação localmente (dentro da pasta 'backend')
```bash
# caso use npm
npm run dev

# caso use yarn
yarn dev
```

## Endpoints
### **[POST]/ride/estimate
* Recebe a origem e o destino da viagem e realizar os cálculos dos valores da viagem. com os seguintes dados:
    * **customer_id**
    * **origin**
    * **destination**

### **[PATCH]/ride/confirm
* Responsável por confirmar a viagem e gravá-la no histórico. Utiliza os seguintes dados:
    * **customer_id**
    * **origin**
    * **destination**
    * **distance**
    * **duration**
    * **driver: {id, name}**
    * **value**

### **[GET]/ride/{customer_id}?driver_id={id do motorista}
* Responsável por listar as viagens realizadas por um determinado usuário.

