# API yard-sale
Backend para aplicacion web que se esta construyendo en el repositorio [yard-sale](https://github.com/pahoalapizco/yard-sale)

### Guía rápida

1. **Clonar el repositorio**

```sh
https://github.com/pahoalapizco/api-yard-sale.git
cd api-yard-sale
```

2. **Configurar variables de entorno**
```sh
cp .env.example .env
```

3. **Instalar dependencias**
```sh
npm install
```
`Instalar docker`
- [Windows](https://docs.docker.com/desktop/windows/install/)
- [Linux](https://docs.docker.com/engine/install/)
- [MacOS](https://docs.docker.com/desktop/mac/install/)

4. **Iniciar contenedor docker**
```sh
docker-compose up -d postgres
```

5. **Iniciar proyecto**
```sh
npm run dev
```
