import { useState } from "react"
import { Table, Button } from "react-bootstrap"
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { useTrades } from "../contexts/TradesContext"
import EditTradeModal from "./EditTradeModal"

export default function TradeTable({ trades }) {
  const { deleteTrade } = useTrades()
  const [showEditTradeModal, setShowEditTradeModal] = useState(false)
  const [viewEditTradeModalTradeId, setViewEditTradeModalTradeId] = useState()
  console.log(trades)
  
  function openEditModal(id) {
    setViewEditTradeModalTradeId(id)
    setShowEditTradeModal(true)
  }

  function closeEditModal() {
    setViewEditTradeModalTradeId()
    setShowEditTradeModal(false)
  }

  console.log(viewEditTradeModalTradeId)
  return (
    <>
    <Table bordered hover variant="dark">
      <thead>
        <tr>
          <th></th>
          <th>Outcome</th>
          <th>Open Date</th>
          <th>Symbol</th>
          <th>Entry</th>
          <th>Exit</th>
          <th>Qty</th>
          <th>$ Return</th>
          <th>% Return</th>
          <th>Side</th>
          <th>Setup</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {trades.map(trade =>
          <tr key={trade.id}>
            <td>
              <Button variant="outline-primary" className="d-flex mb-2" onClick={() => openEditModal(trade.id)}>
                <PencilSquare />
              </Button>
              <Button variant="outline-danger" className="d-flex" onClick={() => deleteTrade(trade)} >
                <Trash />
              </Button>
            </td>
            <td>{trade.outcome}</td>
            <td>{trade.date}</td>
            <td>{trade.symbol}</td>
            <td>{trade.entry}</td>
            <td>{trade.exit}</td>
            <td>{trade.qty}</td>
            <td>${trade.returnDollars}</td>
            <td>{trade.returnPercent}%</td>
            <td>{trade.side}</td>
            <td>{trade.setup}</td>
            <td>{trade.notes}</td>
          </tr>)}
      </tbody>
    </Table>
    <EditTradeModal id={viewEditTradeModalTradeId} show={showEditTradeModal} handleClose={closeEditModal}/>
    </>
  )
}

