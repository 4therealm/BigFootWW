import React,{useState,useEffect} from 'react'
import {CardGroup,Card,Breadcrumb,Button} from 'react-bootstrap'
import {useAppCtx} from '../utils/AppContext'
import ImageUploader from './ImageUploader'








const Categories=() => {

  const {user}=useAppCtx()
  // const userId = user._id;

  const [categories,setCategories]=useState([])
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const [showCategories,setShowCategories]=useState(true)
  const [activeCategory,setActiveCategory]=useState(null)
  const [activeCategoryProducts,setActiveCategoryProducts]=useState([])
  const [selectedProduct,setSelectedProduct]=useState(null)
  const [productId,setProductId]=useState(null)




  useEffect(() => {
    getAllCategories()
  },[])

  const getAllCategories=async () => {
    try {
      setLoading(true)
      const response=await fetch('/api/category')
      const data=await response.json()
      setCategories(data)
      setLoading(false)
    } catch(error) {
      setError(error)
      console.log('error',error)
      setLoading(false)
    }
  }

  const addItem=async (productId,quantity,price,name) => {
    try {
      const response=await fetch(`/api/cart/${user._id}/add`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId,quantity,price,name}),
      })

      if(response.ok) {
        const data=await response.json()
        console.log(data)
      } else {
        throw new Error('Error adding item to cart')
      }
    } catch(error) {
      console.error(error)
    }
  }
  const getOneCategory=async (id) => {
    console.log('id',id)
    try {
      setLoading(true)
      const response=await fetch(`/api/category/${id}`)
      const data=await response.json()
      console.log(data.category.name)
      setActiveCategory(data)
      setActiveCategoryProducts(data.products)
      setShowCategories(false)
      setLoading(false)
    } catch(error) {
      setError(error)
      setLoading(false)
    }
  }

  const resetCategory=() => {
    setActiveCategory(null)
    setActiveCategoryProducts([])
    setShowCategories(true)
  }


  const resetProduct=() => {
    setSelectedProduct(null)
  }




  return (
    <>
    <ImageUploader productId={productId}/>
      <Breadcrumb>
        <Breadcrumb.Item href="#" onClick={resetCategory}>
          Categories
        </Breadcrumb.Item>
        {activeCategory&&(
          <Breadcrumb.Item href="#" onClick={resetProduct}>
            {activeCategory.category.name}
          </Breadcrumb.Item>
        )}
        {selectedProduct&&<Breadcrumb.Item active>{selectedProduct.name}</Breadcrumb.Item>}
      </Breadcrumb>
      {showCategories&&(
        <CardGroup>
          {loading&&<div>Loading...</div>}
          {error&&<div>{error}</div>}
          {categories.map((category) => (
            <Card key={category._id} onClick={() => getOneCategory(category._id)} style={{color: 'white', cursor: 'pointer',margin: '10px',outline: '2px solid red',background: 'black'}}>
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                {/* <Card.Text>{category._id}</Card.Text> */}
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      )}

      {!showCategories&&(
        <div>
          {activeCategoryProducts.length? (
            <CardGroup>
              {activeCategoryProducts.map((product) => (
                <Card key={product._id} style={{color: 'white', cursor: 'pointer',margin: '10px',outline: '2px solid red',background: 'black'}}>
                  <Card.Body>
                    <Card.Img variant="top" src={product.imageUrl} />
                    <Card.Title>Product: {product.name}</Card.Title>
                    <Card.Text >Price: {product.price}</Card.Text>
                    <Card.Text >In stock: {product.stock}</Card.Text>

                    <Button
                      onClick={() =>
                        addItem(product._id,1,product.price,product.name)
                      }
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          ):(
            <p>No products in this category.</p>
          )}
        </div>
      )}

    </>
  )
}

export default Categories
