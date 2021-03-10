Run application:
```bash
make dev-server
```

Make migration:
```bash
yarn typeorm migration:generate -n EntityNameMigration -d src/module-name/entities/migrations
```

Run  migration:
```bash
yarn migration:run
```
