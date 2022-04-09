import { Container, Stack, Button } from "react-bootstrap"
import { useState } from "react"
import AddTradeModal from "./components/AddTradeModal"
import { useTrades } from "./contexts/TradesContext"
import TradeTable from "./components/TradeTable"

function App() {
  const [showAddTradeModal, setShowAddTradeModal] = useState(false)
  
  const { trades } = useTrades()

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Trade Journal</h1>
          <Button variant="primary" onClick={() => setShowAddTradeModal(true)}>Add Trade</Button>
        </Stack>
        <TradeTable trades={trades} />
      </Container>
      <AddTradeModal show={showAddTradeModal} handleClose={() => setShowAddTradeModal(false)} />
    </>
  )
}

export default App;
