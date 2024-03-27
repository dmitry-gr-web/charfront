import React from 'react'
import { IMessageText } from '../helpers/types'

const ChatMessageItem: React.FC<IMessageText> = ({
  text,
  userName,
  color,
  transactionInfo
}) => {
  return (
    <div
      className='chat-message'
      style={{
        marginRight: 'auto'
      }}
    >
      <span style={{ color }}>{userName}</span>
      <br />
      {text}
      {transactionInfo && (
        <div style={{ fontSize: 10 }}>
          Txid: {transactionInfo.txid}
          <br />
          ETH: {transactionInfo.values}
          <br />
          Date: {transactionInfo.date}
          <br />
          walletFrom: {transactionInfo.walletFrom}
          <br />
          walletTo: {transactionInfo.walletTo}
        </div>
      )}
    </div>
  )
}

export default ChatMessageItem
