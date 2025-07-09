# Proyecto Final Ecommerce Diego Kracoff
<!--start: status pages-->

## Info de endpoints disponibles

================================
/api/enpoints

## Contacto

================================
/api/contact

## status

================================
/api/status

## Info

================================
/api/info

## Todos los productos

/api/products/

## Busca el producto por el id

/api/products/:ID

## Busca los productos por el nombre

/api/products/search?name=NOMBRE

## POST - Crea un producto nuevo

/api/products/

BODY
{
    "name": "NOMBRE",
    "price": PRECIO (INT),
    "description":"DESCRIPCION",
    "categories": ["CATEGORIA1", "CATEGORIA2"]
  }

## PUT - Actualiza el producto por el id

/api/products/ID

## Como utilizarla

1. Instalar dependencias

2. npm start

```shell

npm start

## 📄 License

- Code: [MIT](./LICENSE) © [eldikra]
