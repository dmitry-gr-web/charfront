import React, { useState, useEffect, useRef } from 'react'
import { message, Spin } from 'antd'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import ChatStatusBar from './ChatStatusBar'
import ChatMessageItem from './ChatMessageItem'
import { socketUrl } from '../helpers/config'
import { IMessage, IMessageText, ITransactionInfo } from '../helpers/types'
import ChatInputs from './ChatInputs'
import './Chat.scss'

const Chat: React.FC<{
  name: string
  room: string
  leaveFromChat: () => void
}> = ({ name, room, leaveFromChat }) => {
  const chatBlock = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const [messageHistory, setMessageHistory] = useState<IMessageText[]>([])
  const [usersCount, setUsersCount] = useState(0)
  const { lastMessage, sendJsonMessage, readyState } = useWebSocket(socketUrl)

  const info = (text: string) => {
    messageApi.info(text)
  }
  async function wsActions() {
    const json = await lastMessage?.data
    const message: IMessage = JSON.parse(json || '')
    if (!message) return
    const { action, userName, usersLength, text, transactionInfo, color } =
      message
    console.log(message)
    if (action === 'joinRoom') {
      info(`Пользователь ${userName} присоиденился к чату`)
      setUsersCount(usersLength || 0)
    }
    if (action === 'exitRoom') {
      setUsersCount(usersLength || 0)
    }
    if (action === 'sendMessage' || action === 'history') {
      addMessage(userName, text, color, transactionInfo)
    }
    if(action === 'getRooms') {
      console.log({message})
    }
  }
  const addMessage = (
    userName: string,
    text: string,
    color: string,
    transactionInfo: ITransactionInfo | undefined
  ) => {
    setMessageHistory((prev) => [
      ...prev,
      {
        userName: userName,
        text: text,
        color: color,
        transactionInfo: transactionInfo || undefined
      }
    ])
    setTimeout(() => {
      chatBlock.current
        ?.querySelector('.chat-message:last-child')
        ?.scrollIntoView()
    }, 100)
  }
  useEffect(() => {
    if (lastMessage !== null) {
      wsActions()
    }
  }, [lastMessage])

  const handleClickSendMessage = (value: string) => {
    sendJsonMessage({
      action: 'sendMessage',
      text: value,
      userName: name,
      room
    })
  }
  const exitRoom = () => {
    sendJsonMessage({ action: 'exitRoom', userName: name, room })
    leaveFromChat()
  }
  const getRooms = () => {
    sendJsonMessage({ action: 'getRooms',room })
    // leaveFromChat()
  }
  useEffect(() => {
    sendJsonMessage({ action: 'joinRoom', userName: name, room })
  }, [])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
  }[readyState]

  if (connectionStatus === 'Connecting') {
    return <Spin />
  }

  return (
    <div className='chat-block'>
      {contextHolder}
      <ChatStatusBar getRooms={getRooms} exitRoom={exitRoom} count={usersCount} room={room} />
      <div className='chat-body' ref={chatBlock}>
        {messageHistory.map((x, i) => (
          <ChatMessageItem
            text={x.text}
            userName={x.userName}
            color={x.color}
            transactionInfo={x.transactionInfo}
            key={i}
          />
        ))}
      </div>
      <ChatInputs sendMessage={handleClickSendMessage} />
    </div>
  )
}

export default Chat
