import React from 'react'
import './footer.css'
import { Card } from 'react-bootstrap'
const Footer = () => {
  return (
    <>
      <Card className="text-center">
        <Card.Footer className="text-muted">
          © 2022 Copyright: RMart
          </Card.Footer>
      </Card>
    </>
  )
}
export default Footer