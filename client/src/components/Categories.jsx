import React,{useState,useEffect} from 'react'
import { Card,Breadcrumb,Button, Container, Row, Col} from 'react-bootstrap'
import {useAppCtx} from '../utils/AppContext'










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
       <Container>
       <Row>
         {loading && <div>Loading...</div>}
         {error && <div>{error}</div>}
         {categories.map((category) => (
           <Col xs={12} sm={6} md={4} lg={3} key={category._id} className="mb-4">
             <Card
               onClick={() => getOneCategory(category._id)}
               style={{
                 color: "white",
                 cursor: "pointer",
                 margin: "10px",
                 outline: "2px solid red",
                 background: "black",
               }}
             >
               <Card.Body>
                 <Card.Title>{category.name}</Card.Title>
                 {/* <Card.Text>{category._id}</Card.Text> */}
               </Card.Body>
             </Card>
            </Col>

          ))}
        </Row>
      </Container>
      )}

      {!showCategories&&(
        <div>
          {activeCategoryProducts.length? (
           <Container>
           <Row>
             {activeCategoryProducts.map((product) => (
               <Col xs={12} sm={6} md={4} lg={3} key={product._id} className="mb-4">
                 <Card
                   style={{
                     color: "white",
                     cursor: "pointer",
                     margin: "10px",
                     outline: "2px solid red",
                     background: "black",
                   }}
                 >
                   <Card.Body>
                     <Card.Img variant="top" src={product.imageUrl} />
                     <Card.Title>{product.name}</Card.Title>
                     <Card.Text>${product.price}</Card.Text>
                     <Card.Text>In stock: {product.stock}</Card.Text>
                     <Button
                       onClick={() =>
                         addItem(product._id, 1, product.price, product.name)
                       }
                     >
                       Add to Cart
                     </Button>
                   </Card.Body>
                 </Card>
               </Col>
             ))}
           </Row>
         </Container>
          ):(
            <p>No products in this category.</p>
          )}
        </div>
      )}

    </>
  )
}

export default Categories
