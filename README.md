
# Run the back-end

Make sure you have NodeJS installed.

```
cd back-end && npm i && create file .env (copy from .env.example to .env) && npx prisma migrate dev && npm run start:dev

```

# Run the front-end

Make sure you have NodeJS installed.

```
cd front-end && npm i && create file .env ( VITE_API_URL=http://localhost:8228 ) && npm run dev
```

