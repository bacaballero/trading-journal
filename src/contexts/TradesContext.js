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
  function getTrade(id) {
    return trades.find(trade => trade.id === id)
  }

  function deleteTrade({ id }) {
    setTrades(prevTrades => {
      return prevTrades.filter(trade => trade.id !== id)
    })
  }

  function editTrade(id, trade) {
    trade.id = id
    setTrades(prevTrades => {
      return prevTrades.map(prevTrade => prevTrade.id === id ? trade : prevTrade)
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