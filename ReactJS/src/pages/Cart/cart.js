import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../Components/Layout/layout'
import { Modal, Button, Table, Form } from 'react-bootstrap'
import { collection, addDoc } from "firebase/firestore";
import db from '../../firebase'
import './cart.css'

const Cart = () => {
    //variable declaration
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartReducer)
    const [cartTotal, setCartTotal] = useState(0)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const temp = JSON.parse(localStorage.getItem('currentUser'))
    let date = new Date()
    const orderDate = (`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)

    //displaying cart quantity
    let total = 0;
    cartItems.map((obj) => {
        total += obj.quantity
    });

    //using effect
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])
    useEffect(() => {
        let temp = 0;
        cartItems.forEach(obj => {
            temp += (obj.price * obj.quantity)
        });
        setCartTotal(temp)
    }, [cartItems])

    //adding cartitems to order
    async function addOrder(final) {
        const docRef = await addDoc(collection(db, "orders"), final);
    }

    //button place order click
    const btnPlaceOrder = () => {
        { cartItems.length == 0 ? alert('Add items to cart') : handleShow() }
    }

    // button save order click
    const orderSave = () => {
        if (name == "" || address == "" || pincode == "" || phone == "") {
            alert('enter data')
        } else {
            //setting data for order
            const orderInfo = {
                person: name,
                address: address,
                pincode: pincode,
                phone: phone,
                total: cartTotal,
                orderDate: orderDate
            }
            const final = {
                cartItems: cartItems,
                userID: temp.id,
                orderInfo: orderInfo
            }
            addOrder(final)

            //resetting page
            handleClose()
            setAddress("")
            setName("")
            setPhone("")
            setPincode("")
            alert('Order placed succesfully')
            localStorage.removeItem('cartItems')
            dispatch({ type: 'REMOVE_ALL_FROM_CART', payload: "" })
        }
    }
    return (
        <Layout>
            <Table responsive className='mt-3'>
                <thead>
                    <tr>
                        <th>Sr no.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((cartitem, i) => {
                        return <tr key={i}>
                            <td>{i+1}</td>
                            <td className='imageDiv'><img src={cartitem.imageURL} className='image' /> </td>
                            <td>{cartitem.name}</td>
                            <td>{cartitem.price}</td>
                            <td>{cartitem.quantity}</td>
                            <td><Button variant="danger" onClick={() => {
                                dispatch({ type: 'REMOVE_FROM_CART', payload: cartitem })
                            }}>Delete</Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <div className='text-end end'>
                <h4>
                    Total ({total}) :<span style={{ fontSize: 30 }}>
                        {cartTotal}
                    </span> RS/-
                </h4>
                <Button onClick={btnPlaceOrder}>
                    Place order
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you for shoping with Rmart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder='Full name' value={name} onChange={(e) => { setName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder='Pincode' value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder='Mobile number' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={orderSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Layout >
    )
}
export default Cart