# Ecommerce Backend

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| <img src="assets/images/js-logo.svg" alt="javascript" width="20"/> JavaScript | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)     |  
| <img src="assets/images/nodejs-icon.svg" alt="html" width="20"/> Node.js    | [https://developer.mozilla.org/en-US/docs/Glossary/Node.js](https://developer.mozilla.org/en-US/docs/Glossary/Node.js) | 
| <img src="assets/images/mysql-icon.svg" alt="html" width="20"/> MySQL    | [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/) | 
| <img src="assets/images/expressjs-logo.svg" alt="html" width="20"/> Express.js    | [https://developer.mozilla.org/en-US/docs/Glossary/Express.js](https://developer.mozilla.org/en-US/docs/Glossary/Express.js) |
## Description 

This application allows users to make API requests to an express.js server to read, write, and update ecommerce data in a MySQL database. 

## Functionality
View the walkthrough video [here](https://drive.google.com/file/d/19YubOckyPAlJWcLkSu8rRrzGQRaWNM6D/view).

## Code Snippets
The below code uses sequelize models and methods to correctly define the relationships between the Product, Category, Tag, and ProductTag MySQL tables.

```javascript
// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
```