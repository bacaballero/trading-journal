import React, { useContext } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TradesContext = React.createContext()

export function useTrades() {
  return useContext(TradesContext)
}

export const TradesProvider = ({ children }) => {
  const [trades, setTrades ] = useLocalStorage("trades", [])

  function addTrade({ outcome, date, symbol, entry, exit, qty, returnDollars, returnPercent, side, setup, notes }) {
    setTrades(prevTrades => {
      return [...trades, { id: uuidV4(), outcome, date, symbol, entry, exit, qty, returnDollars, returnPercent, side, setup, notes }]
    })
  }
  function getTrade(tradeId) {
    return trades.filter(trade => trade.tradeId === tradeId)
  }

  function deleteTrade({ id }) {
    setTrades(prevTrades => {
      return prevTrades.filter(trade => trade.id !== id)
    })
  }

  function editTrade({ tradeId, trades }) {
    setTrades(changedTrade => {
      return trades.map(trade => trade.tradeId !== tradeId ? trade : changedTrade)
    })
  }

  return (
    <TradesContext.Provider value={{
      trades,
      addTrade,
      getTrade,
      deleteTrade,
      editTrade
    }}>
      {children}
    </TradesContext.Provider>
  )
}