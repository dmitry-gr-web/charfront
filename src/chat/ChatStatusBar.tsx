import React from 'react'
import { UserOutlined, NumberOutlined, ApiOutlined } from '@ant-design/icons'
import { Badge, Tooltip, Button } from 'antd'
const ChatStatusBar: React.FC<{
  count: number
  room: string
  exitRoom: () => void
  getRooms: () => void
}> = ({ room, count, exitRoom, getRooms }) => {
  return (
    <div className='chat-status-bar'>
      <Tooltip
        overlayInnerStyle={{ fontSize: '12px' }}
        title={`ID комнаты ${room}`}
      >
        <NumberOutlined /> {room}
      </Tooltip>
      <Button onClick={getRooms}>Getrooms</Button>
      <Tooltip
        overlayInnerStyle={{ fontSize: '12px' }}
        title={`Покинуть комнату`}
      >
        <Button
          size={'small'}
          onClick={() => {
            exitRoom()
          }}
        >
          <ApiOutlined />
        </Button>
      </Tooltip>
      <div style={{ marginRight: 5 }}>
        <Tooltip
          overlayInnerStyle={{ fontSize: '12px' }}
          title={`Количество пользователей в комнате ${count}`}
        >
          <Badge color='#1677ff' title='' count={count} size='small'>
            <UserOutlined />
          </Badge>
        </Tooltip>
      </div>
    </div>
  )
}

export default ChatStatusBar
