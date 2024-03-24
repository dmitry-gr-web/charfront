import React from 'react'
import { IMessageText } from '../helpers/types'

const ChatMessageItem: React.FC<IMessageText> = ({
  text,
  userName,
  color,
  currentName,
  transactionInfo
}) => {
  return (
    <div
      className='chat-message'
      style={{
        marginLeft: userName === currentName ? 'auto' : '',
        marginRight: userName !== currentName ? 'auto' : '',
        textAlign: userName === currentName ? 'right' : 'left'
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
