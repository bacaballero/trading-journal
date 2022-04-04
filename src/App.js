import { Container, Stack, Button, Table } from "react-bootstrap"
import { useState } from "react"
import AddTradeModal from "./components/AddTradeModal"
import { useTrades } from "./contexts/TradesContext"
import TradeTable from "./components/TradeTable"

const trades = [{
  outcome: 'WIN',
  openDate: 'APR 1, 2022',
  closeDate: 'APR 1, 2022',
  symbol: 'VOO',
  entry: '400',
  exit: '420',
  qty: '1,000',
  returnDollars: '$20,000',
  returnPercent: '5%',
  side: 'LONG',
  setup: 'BTFD',
  notes: 'LET THE TRADE BREATHE'
},
{
  outcome: 'LOSS',
  openDate: 'APR 1, 2022',
  symbol: 'MSFT',
  entry: '300',
  exit: '330',
  qty: '1,000',
  returnDollars: '$30,000',
  returnPercent: '10%',
  side: 'LONG',
  setup: 'BTFD',
  notes: 'SET WIDER TRAILING STOP'
}]

function App() {
  // const [trades, setTrades] = useState([])
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
