import React, { useState, useEffect } from 'react'
import Layout from '../../Components/Layout/layout'
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../firebase'
import { Table } from 'react-bootstrap'
import './orders.css'


const Orders = () => {

    const [order, setOrder] = useState([])
    useEffect(() => {
        getData()
    }, [])
    async function getData() {

        const tempArray = []
        const temp = JSON.parse(localStorage.getItem('currentUser'))
        const q = query(collection(db, "orders"), where("userID", "==", temp.id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const obj = {
                id: doc.id,
                ...doc.data()
            }
            tempArray.push(obj)

        });
        setOrder(tempArray)
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
                    </tr>
                </thead>
                {order.map((obj, i) => {
                    return <tbody key={i}>{obj.cartItems.map((cartitem, i) => {
                        return <tr key={i}>
                            <td>{i+1}</td>
                            <td className='imageDiv'><img src={cartitem.imageURL} className='image' /> </td>
                            <td>{cartitem.name}</td>
                            <td>{cartitem.price}</td>
                            <td>{cartitem.quantity}</td>
                        </tr>
                    })}<tr className='text-end'>
                            <td colSpan='5'>
                                <h5>Total : {obj.orderInfo.total} RS/-</h5>
                                <h5> Purchesed on :{obj.orderInfo.orderDate}</h5>
                            </td>
                        </tr>
                    </tbody>
                })}
            </Table>


        </Layout>
    )
}

export default Orders