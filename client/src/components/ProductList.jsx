import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function ProductList({ activeCategoryProducts, addItem }) {
  const [showText, setShowText] = useState(false);

  return (
    <Container>
      <Row>
        {activeCategoryProducts.map((product) => (
          <Col xs={12} sm={6} md={4} lg={3} key={product._id} className="mb-4">
            <Button
                  variant="text-primary"
                  onClick={() => setShowText(!showText)}
                  style={{ marginRight: "10px" }}
                >
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
                <Card.Title>Product: {product.name}</Card.Title>
                <Card.Text
                  style={{ display: showText ? "block" : "none" }}
                >
                  Price: {product.price}
                </Card.Text>
                <Card.Text
                  style={{ display: showText ? "block" : "none" }}
                >
                  In stock: {product.stock}
                </Card.Text>
    
                <Button
                  onClick={() =>
                    addItem(product._id, 1, product.price, product.name)
                  }
                  >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
                  </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
