import fs from 'fs'

export class ProductManager {
  constructor(filePath) {
    this.filePath = filePath
    this.format = 'utf-8'
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let products = await this.getProducts();
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProduct = {id: lastProductId + 1, title, description, price, thumbnail, code, stock,}
    products.push(newProduct) 
    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, '\t'))
  }

  getProducts = async () => {
    const fileContent = await fs.promises.readFile(this.filePath, this.format)
    return JSON.parse(fileContent)
  }
  getProductById = async (id) => {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }
 // Actualizamos un producto en especifico buscando con su id y los parametros a actualizar
/*  updateProduct = async (id, update) => {
  // Leer el contenido del archivo
  const products = await this.getProducts();

  // Buscar el índice del producto con el id especificado
  const index = products.findIndex((prod) => prod.id === id);

  // Si el producto existe, actualizarlo
  if (index !== -1) {

    // Validar el objeto de actualización
    const isValid = await this.#validateProduct(update);
    if (!isValid) {
      return console.log(
        "Error al actualizar: actualización inválida"
      );
    }

    // Crear un nuevo objeto producto actualizado
    products[index] = { ...products[index], ...update };

    // Escribir el array de productos actualizado al archivo
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(products, null, "\t"),
      this.#format
    );

    // Actualizar el array de productos en la instancia de ProductManager
    this.products = products;

    // Devolver el producto actualizado
    return console.log("Producto Actualizado", products[index]);
  }

  // Si el producto no existe, devolvemos un mensaje
  return console.log("Error al actualizar: Producto no encontrado");
}; */



  /* corregir con spread operation */
  updateProduct = async (index, updatedProduct) => {
    let products = await this.getProducts();
    products[index] = { ...products[index], ...updatedProduct };
    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, '\t'));
  };

  deleteProduct = async (index) => {
    let products = await this.getProducts()
    products.splice(index, 1);
    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, '\t'))
  }
}



const manager = new ProductManager('./products.json')
    manager.getProducts()
  /*   manager.addProduct( 'producto prueba','descripcion prueba', 500, 'Sin imagen', 'abc122', 50)
/*     manager.updateProduct(5, {title:"producto", price: 1700, code:"nada" })  
    manager.deleteProduct(0) */



