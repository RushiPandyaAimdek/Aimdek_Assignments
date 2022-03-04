import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/layout'
import { getDoc, doc } from "firebase/firestore"
import db from '../../firebase'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Row, Image } from 'react-bootstrap'
import './productinfo.css'

const Productinfo = () => {

    const [product, setProduct] = useState([])
    const params = useParams()
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartReducer)
    let flag = true

    const btnAddToCart = () => {
        const quantityx = parseInt(prompt('enter quantity'))

        cartItems.forEach((element, index) => {
            if (element.id == product.id) {
                flag = false
                cartItems[index].quantity = cartItems[index].quantity + parseInt(quantityx);
            }
        });
        if (flag) {
            product.quantity = quantityx
            dispatch({ type: 'ADD_TO_CART', payload: product })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    async function getData() {
        try {
            const fireProduct = await getDoc(doc(db, "products", params.id));
            const temp = fireProduct.data()
            temp.id = params.id
            setProduct(temp)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            {product && (
                <Container>
                    <Row>
                        <div className='mt-3'>
                            <h4>{product.name}</h4>
                        </div>
                        <div className='mt-3'>
                            <Image src={product.imageURL} className='image'/>
                        </div>
                        <div className='mt-3'>
                            {product.description}
                        </div>
                        <div className='d-flex justify-content-end mb-3 mt-3'>
                            <Button className='mx-2' onClick={btnAddToCart}>Add to cart</Button>
                        </div>
                    </Row>
                </Container>
            )}

        </Layout>
    )
}
export default Productinfo