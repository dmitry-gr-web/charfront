import { useState } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'
type Props = {
  sendMessage: (value: string) => void
}
const ChatInputs: React.FC<Props> = ({ sendMessage }) => {
  const [value, setValue] = useState('')
  return (
    <div className='chat-inputs'>
      <Input
        size='large'
        style={{ borderRadius: '0' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value.length > 0) {
            sendMessage(value)
            setValue('')
          }
        }}
        placeholder=''
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <Button
        style={{ borderRadius: '0' }}
        onClick={() => {
          if (value.length > 0) {
            sendMessage(value)
            setValue('')
          }
        }}
        type='primary'
        size={'large'}
      >
        <ArrowUpOutlined />
      </Button>
    </div>
  )
}

export default ChatInputs
