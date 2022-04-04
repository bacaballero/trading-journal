import { Modal, Form, Button, Row, Col } from "react-bootstrap"
import { useRef } from "react"
import { useTrades } from "../contexts/TradesContext"

export default function AddTradeModal({ show, handleClose }) {
  const outcomeRef = useRef()
  const dateRef = useRef()
  const symbolRef = useRef()
  const entryRef = useRef()
  const exitRef = useRef()
  const qtyRef = useRef()
  const returnDollarsRef = useRef()
  const returnPercentRef = useRef()
  const sideRef = useRef()
  const setupRef = useRef()
  const notesRef = useRef()

  const { addTrade } = useTrades()

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
    addTrade(
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
  
  return <Modal show={show} onHide={handleClose}>
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>New Trade</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Open Date</Form.Label>
          <Form.Control ref={dateRef} type="date" placeholder="Date"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="symbol">
          <Form.Label>Symbol</Form.Label>
          <Form.Control ref={symbolRef} type="text" placeholder="e.g. AAPL"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="entry" >
          <Row>
            <Col xs={12} md={6} >
              <Form.Label>Entry Price</Form.Label>
              <Form.Control ref={entryRef} type="number" required min={0} step={0.01}/>
            </Col>
            <Col xs={12} md={6} >
              <Form.Label>Exit Price</Form.Label>
              <Form.Control ref={exitRef} type="number" required min={0} step={0.01}/>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="qty">
          <Form.Label>Quantity</Form.Label>
          <Form.Control ref={qtyRef} type="number" required min={0}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="side">
          <Form.Label>Side</Form.Label>
          <Form.Select ref={sideRef}>
            <option>Long</option>
            <option>Short</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="setup">
          <Form.Label>Trade Setup</Form.Label>
          <Form.Control ref={setupRef} type="text" placeholder="e.g. Gap Fill" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="notes">
          <Form.Label>Trade Notes</Form.Label>
          <Form.Control ref={notesRef} type="text" placeholder="e.g. Ignored plan, panic sold, etc." />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            Add Trade
          </Button>
        </div>
      </Modal.Body>
    </Form>
  </Modal>

}
