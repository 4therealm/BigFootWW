import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit"
import React,{useEffect,useState} from 'react'
import {useAppCtx} from '../utils/AppContext'


export default function PaymentMethods() {

  const {user,userCart,setUserCart,updatedCart,setUpdatedCart}=useAppCtx()
  const [hasQuantityChanged,setHasQuantityChanged]=useState(false)
  const [showCheckoutSuccess,setShowCheckoutSuccess]=useState(false)

  useEffect(() => {
    if(user&&user.cart) {
      setUpdatedCart(user.cart.items)
    }
  },[user,setUpdatedCart])

  const increaseQuantity=(index) => {
    const newCart=[...updatedCart]
    newCart[index].quantity+=1
    setUpdatedCart(newCart)
    setHasQuantityChanged(true)
  }

  const decreaseQuantity=(index) => {
    const newCart=[...updatedCart]
    if(newCart[index].quantity>1) {
      newCart[index].quantity-=1
      setUpdatedCart(newCart)
      setHasQuantityChanged(true)
    }
  }
  const calculateTotalPrice=() => {
    if(updatedCart.length>0) {
      return updatedCart.reduce((total,item) => total+item.price*item.quantity,0)
    }
    return 0
  }

  const totalPrice=calculateTotalPrice()

  const calculateTotalItems = () => {
    let total = 0;
    updatedCart.forEach(item => {
      total += item.quantity;
    });
    return total;
  }
  
  const checkout=async () => {
    try {
      const response=await fetch(`/api/order/checkout/${user._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({products: updatedCart}),
      })

      if(response.ok) {
        const data=await response.json()
        console.log('Checkout successful:',data)
        setUpdatedCart([]) // Clear the cart
        setUserCart([]) // Update the user cart context
        setShowCheckoutSuccess(true) // Show a success message
      } else {
        throw new Error('Error during checkout')
      }
    } catch(error) {
      console.error(error)
    }
  }

  const removeItem=async (userId,productId) => {
    try {
      const response=await fetch(`/api/cart/${userId}/remove/${productId}`,{
        method: 'DELETE',
      })

      if(response.ok) {
        const data=await response.json()
        console.log('Item removed:',data)
        setUpdatedCart(data.cart.items) // Update the cart
        setUserCart(data.cart.items) // Update the user cart context
      } else {
        throw new Error('Error during checkout')
      }
    } catch(error) {
      console.error(error)
    }
  }
  const updateCart=async () => {
    try {
      const response=await fetch(`/api/cart/${user._id}/update`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCart),
      })

      if(response.ok) {
        const updatedUserCart=await response.json()
        setUserCart(updatedUserCart.items)
      } else {
        throw new Error('Error updating item quantities in cart')
      }
    } catch(error) {
      console.error(error)
    }
    setHasQuantityChanged(false)
  }


  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">

        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                <MDBTypography tag="h5" className="mb-0">
  {calculateTotalItems()} item(s) in your cart
</MDBTypography>

                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>

                {updatedCart.length>0? (
                  <div>
                    {hasQuantityChanged&&(
                              <button variant="primary" onClick={updateCart}>
                                Update Cart
                              </button>
                            )}
                    {updatedCart.map((item,index) => (
                      <MDBRow key={item.productId}>
                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                          <MDBRipple rippleTag="div" rippleColor="light"
                            className="bg-image rounded hover-zoom hover-overlay">
                            <img src={item.imageUrl} alt={item.name} />
                            {/* the product image */}
                            <a href="#!">
                              <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.2)",}}>
                              </div>
                            </a>
                          </MDBRipple>
                        </MDBCol>

                        {/* name, price and stock */}
                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                          <p>
                            <strong>{item.name}</strong>
                          </p>


                          <MDBTooltip wrapperProps={{size: "sm"}} wrapperClass="me-1 mb-2"
                            title="Remove item" onClick={() => removeItem(user._id,item.productId)}>
                            <p>Remove item</p>
                            <MDBIcon fas icon="trash" />
                          </MDBTooltip>

                          <MDBTooltip wrapperProps={{size: "lsm",color: "danger"}} wrapperClass="me-1 mb-2"
                            title="Move to the wish list">
                            <p>wish list</p>
                            <MDBIcon fas icon="heart" />
                          </MDBTooltip>

                        </MDBCol>
                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">

                          <MDBBtn variant="text-primary" size="lg" onClick={() => decreaseQuantity(index)}>
                            -
                          </MDBBtn>{' '}
                          {item.quantity}{' '}
                          <MDBBtn variant="text-primary" size="lg" onClick={() => increaseQuantity(index)}>
                            +
                          </MDBBtn>


                          <p className="text-start text-md-center">
                            <strong>{totalPrice}</strong>
                            
                          </p>
                        </MDBCol>
                      </MDBRow>
                    ))}
                    
                  </div>
                ):(
                  <div>
                    <p>Your cart is empty</p>
                  </div>
                )}

             </MDBCardBody>
            </MDBCard>
          </MDBCol>


          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem
                    className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>${totalPrice}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem
                    className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>${totalPrice}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>

                <MDBBtn block size="lg">
                  Go to checkout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}