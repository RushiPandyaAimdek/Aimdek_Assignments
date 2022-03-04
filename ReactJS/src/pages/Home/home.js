import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/layout'
import { collection, getDocs } from "firebase/firestore"
import db from '../../firebase'
import './home.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Container, Form, Row, Button, Image, Col } from 'react-bootstrap'

const Home = () => {
    //variable declaration
    const [products, setProduct] = useState([])
    const [loader, setLoader] = useState(false)
    const [filter, setFilter] = useState("")
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cartReducer)

    useEffect(() => {
        getAllData()
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    //getting data for displaying product  
    async function getAllData() {
        try {
            setLoader(true)
            const tempArray = []
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    ...doc.data()
                }
                tempArray.push(obj)
                setLoader(false)
            });
            setProduct(tempArray)
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    return (
        <Layout loader={loader}>
            <Container>
                <Row className='mt-3'>
                    <Col md={{ span: 4}}>
                    <Form.Select value={filter} onChange={(e) => { setFilter(e.target.value) }}>
                        <option value="">All</option>
                        <option value="shirt">Shirt</option>
                        <option value="earphone">Earphone</option>
                        <option value="watch">Watch</option>
                    </Form.Select>
                    </Col>
                </Row>
                <Row>
                    {products.filter(obj => obj.category.includes(filter)).map((product,i) => {
                        return <div className='col-md-4' key={i}>
                            <div className='product position-relative'>
                                <div className='product-content'>
                                    <p>{product.name}</p>
                                    <div className='text-center'>
                                        <Image src={product.imageURL} className='product-img' />
                                    </div>
                                </div>
                                <div className='product-action'>
                                    <h3>{product.price} RS/-</h3>
                                    <div className='d-flex'>
                                        <Button onClick={() => {
                                            navigate(`/ProductInfo/${product.id}`);
                                        }}>View</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </Row>
            </Container>
        </Layout>
    )
}
export default Home