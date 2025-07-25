# Proyecto Final Ecommerce Diego Kracoff - Talento Tech 2025 JPF

## 📦 Funcionalidades

- Listado completo de productos
- Busqueda por ID de producto
- Busqueda por nombre de producto
- CRUD de productos
- Autenticacion por JWT
- Control de acceso por roles (`admin`,`user`, anonymous)

## 🚀 Como utilizarla

1. Ir a la ubicacion donde deseamos dejar los archivos

  ```shell
  cd C:
  mkdir e-commerce
  cd e-commerce
  ```

2. Clonar el repositorio

  ```shell
  git clone https://github.com/eldikra/proyecto-final-ecommerce-diego-kracoff.git
  ```

3. Instalar dependencias

```shell
npm i #Asegurarse que se tenga el archivo package.json
```

3. Crear y configurar variables de entorno:

```bash
#Copiar el archivo de ejemplo y completar con los datos requeridos
cp modelo_.env .env
```

4. Ejecutar en desarrollo

```shell
npm run dev
```

## Endpoints

### Info de endpoints disponibles

---

```shell
GET /api/enpoints
```

### Contacto

---

```shell
GET /api/contact
```

*Respuesta:* Mail y telefono

### status

---

```shell
GET /api/status
```

*Respuesta:*

```json
{
    "status": "El servidor está en funcionamiento"
}
```

### Info

---

```shell
GET /api/info
```

*Respuesta:*
```json
{
    "name": "Proyecto Final",
    "version": "1.0.0",
    "description": "API para el proyecto final"
}
```

---

### 📋Todos los productos

❗*NOTA*\
***el directorio `/api/products/` requiere de token bearer***

```shell
GET /api/products/
```

### 🔎Busca el producto por el id

```shell
GET /api/products/:ID
```

### 🔎Busca los productos por el nombre

```shell
GET /api/products/search?name=NOMBRE
```

### ➕ POST - Crea un producto nuevo

```shell
POST /api/products/
```

**Body (JSON):**

```json
{
    "name": "NOMBRE",
    "price": PRECIO (INT),
    "description":"DESCRIPCION",
    "categories": ["CATEGORIA1", "CATEGORIA2"]
  }
```

*Respuesta:* Valida que se hayan ingresado los datos y guarda en de db.

## ✏️ PUT - Actualiza el producto por el id

```shell
PUT /api/products/:ID
```

**body (JSON):**

```json
{
    "name": "Iphone Case Negro",
    "price": 150,
    "description":"Funda para Iphone",
    "category": ["electronica", "fundas"]
  }
```
## 🗑️ DELETE - Eliminar producto

```shell
DELETE /api/products/:id
```

Elimina el producto con el ID especificado.

---

## 👤 Autenticación

### 🔐 Login

```
POST /auth/login
```

**Body (JSON):**

```json
{
    "email":"AAAAAA@AAAAA.com",
    "password":"************"
}
```

Devuelve un token JWT si las credenciales son válidas.

---

## Estructura del proyecto

```shell
src/
├── Controllers/
│    ├── autenticacion.controlador.js
│    └── productos.controlador.js
├── Middlewares/
│    └──── auth.middleware.js
├── Modelos/
│    ├── firebase.js
│    ├── autenticacion.modelo.js
│    ├── user.model.js
│    └── prouctos.modelo.js
│
├── Routes/
│    ├── auth.js
│    ├── routes.js
│    └── products.js
├── Services/
    └──── .gitkeep
```

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- Firebase Firestore
- JWT
- Vercel (deploy)

---

## 📄 License

- Code: [MIT](./LICENSE) © [eldikra]
