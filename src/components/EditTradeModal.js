import { Modal, Form, Button, Row, Col } from "react-bootstrap"
import { useRef } from "react"
import { useTrades } from "../contexts/TradesContext"

export default function EditTradeModal({ id, show, handleClose }) {
  const { editTrade, getTrade } = useTrades()
  
  const tradeToUpdate = getTrade(id)

  const dateRef = useRef()
  const symbolRef = useRef()
  const entryRef = useRef()
  const exitRef = useRef()
  const qtyRef = useRef()
  const sideRef = useRef()
  const setupRef = useRef()
  const notesRef = useRef()

  function getOutcome(entry, exit, side) {
    if (side === 'Long') {
      if (exit > entry) {
        return 'Win'
      } else {
        return 'Loss'
      }
    } else {
      if (entry > exit) {
        return 'Win'
      } else {
        return 'Loss'
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    editTrade( id,
    {
      outcome: getOutcome(entryRef.current.value, exitRef.current.value, sideRef.current.value),
      date: dateRef.current.value,
      symbol: symbolRef.current.value,
      entry: parseFloat(entryRef.current.value),
      exit: parseFloat(exitRef.current.value),
      qty: parseInt(qtyRef.current.value),
      returnDollars: parseFloat((exitRef.current.value - entryRef.current.value) * qtyRef.current.value),
      returnPercent: parseFloat(((exitRef.current.value / entryRef.current.value)-1) * 100).toFixed(2),
      side: sideRef.current.value,
      setup: setupRef.current.value,
      notes: notesRef.current.value
    })
    handleClose()
  }
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Trade</Modal.Title>
        </Modal.Header>
        {id != null && (
          <Modal.Body className="show-grid">
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Open Date</Form.Label>
              <Form.Control ref={dateRef} type="date" defaultValue={tradeToUpdate.date}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="symbol">
              <Form.Label>Symbol</Form.Label>
              <Form.Control ref={symbolRef} type="text" defaultValue={tradeToUpdate.symbol}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="entry" >
              <Row>
                <Col xs={12} md={6} >
                  <Form.Label>Entry Price</Form.Label>
                  <Form.Control ref={entryRef} type="number" required min={0} step={0.01} defaultValue={tradeToUpdate.entry}/>
                </Col>
                <Col xs={12} md={6} >
                  <Form.Label>Exit Price</Form.Label>
                  <Form.Control ref={exitRef} type="number" required min={0} step={0.01} defaultValue={tradeToUpdate.exit}/>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="qty">
              <Form.Label>Quantity</Form.Label>
              <Form.Control ref={qtyRef} type="number" required min={0} defaultValue={tradeToUpdate.qty}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="side">
              <Form.Label>Side</Form.Label>
              <Form.Select ref={sideRef} defaultValue={tradeToUpdate.side}>
                <option>Long</option>
                <option>Short</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="setup">
              <Form.Label>Trade Setup</Form.Label>
              <Form.Control ref={setupRef} type="text" defaultValue={tradeToUpdate.setup} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Trade Notes</Form.Label>
              <Form.Control ref={notesRef} type="text" defaultValue={tradeToUpdate.notes} />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Update Trade
              </Button>
            </div>
          </Modal.Body>
        )}
      </Form>
    </Modal>
  )
}
