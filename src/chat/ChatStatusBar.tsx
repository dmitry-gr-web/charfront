import React from 'react'
import { UserOutlined, NumberOutlined } from '@ant-design/icons'
import { Badge, Tooltip } from 'antd'
const ChatStatusBar: React.FC<{ count: number; room: string }> = ({
  room,
  count
}) => {
  return (
    <div className='chat-status-bar'>
      <Tooltip
        overlayInnerStyle={{ fontSize: '12px' }}
        title={`ID комнаты ${room}`}
      >
        <NumberOutlined /> {room}
      </Tooltip>
      <div>
        
      </div>
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
