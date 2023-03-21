import React, { useState, useEffect } from 'react';
import { CardGroup, Card, Breadcrumb } from 'react-bootstrap';
import ShoppingCart from './ShoppingCart';
import useShoppingCartItem from '../hooks/useShoppingCartItem';





const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeCategoryProducts, setActiveCategoryProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const {
    shoppingCartId,
    setShoppingCartId,
    productId,
    setProductId,
    quantity,
    setQuantity,
    itemId,
    setItemId,
    addItem,
    updateItem,
    removeItem,
  } = useShoppingCartItem();


  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/categories');
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log('error', error);
      setLoading(false);
    }
  };

  const getOneCategory = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/categories/${id}`);
      const data = await response.json();
      setActiveCategory(data);
      setActiveCategoryProducts(data.products);
      setShowCategories(false);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const resetCategory = () => {
    setActiveCategory(null);
    setActiveCategoryProducts([]);
    setShowCategories(true);
  };


  const resetProduct = () => {
    setSelectedProduct(null);
  };

  const addToCart = async (product) => {
    console.log('product', product);
    setProductId(product.id);
    setQuantity(1); // Assuming you want to add 1 item to the cart
    await addItem();
  };


  return (
    <>
    <ShoppingCart cart={cart} />
    <Breadcrumb>
      <Breadcrumb.Item href="#" onClick={resetCategory}>
        Categories
      </Breadcrumb.Item>
      {activeCategory && (
        <Breadcrumb.Item href="#" onClick={resetProduct}>
          {activeCategory.category_name}
        </Breadcrumb.Item>
      )}
      {selectedProduct && <Breadcrumb.Item active>{selectedProduct.product_name}</Breadcrumb.Item>}
    </Breadcrumb>
      {showCategories && (
        <CardGroup>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {categories.map((category) => (
            <Card key={category.id} onClick={() => getOneCategory(category.id)} style={{ cursor: 'pointer', margin: '10px', outline: '2px solid red' }}>
              <Card.Body>
                <Card.Title>{category.category_name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      )}

      {!showCategories && (
        <div>
          {activeCategoryProducts.length ? (
            <div>
              <ul>
                {activeCategoryProducts.map((product) => (
                  <div key={product.id}  style={{ border: '2px solid black', padding: '10px', margin: '10px' }}>
                    <li>
                      <p>Product: {product.product_name}</p>
                    </li>
                    <li>
                      <p>Price: {product.price}</p>
                    </li>
                    <li>
                      <p>In stock: {product.stock}</p>
                    </li>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>

                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p>No products in this category.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Categories;
