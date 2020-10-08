## Bonch.dev Quasar Kubernetes Kluster helper

This packages used to upgrade your project to use it in our (bonch.dev) Kluster

After install you need add to `package.json` in `{script}` next lines:
```
    "build": "quasar build -m pwa",
    "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:dev": "quasar dev -m pwa",
    "start:prod": "node server.js",
```

And update your `quasar.conf.js` in `{devServer}`
```
    port: process.env.PORT || 5000,
    open: true,
    public: process.env.PUBLIC_URL || `localhost:${process.env.PORT || 5000}`
```

## Working with branches

| **Branch**          | **Type of deploy**  |
|---------------------|---------------------|
| master              |   Production        |
| staging             |   Staging           |
| %any_another_name%  |   Review            |
