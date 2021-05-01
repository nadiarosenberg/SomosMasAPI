# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
yarn
```

3) Migrations:
``` bash
yarn sequelize-cli db:migrate
```

4) Seeders:
``` bash
yarn sequelize-cli db:seed:all
```

## Start local server

``` bash
yarn start
yarn run dev
```
