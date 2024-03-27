import { useState, useRef } from 'react'
import Chat from './chat/Chat'
import { Button, Input, Form, type FormProps } from 'antd'
import { IFieldFormType } from './helpers/types'

function App() {
  const formValues = useRef<IFieldFormType>({ username: '', idroom: '' })
  const [enterInChat, setEnterInChat] = useState(false)
  const onFinish: FormProps<IFieldFormType>['onFinish'] = (values) => {
    console.log('Success:', values)
    formValues.current.username = values.username
    formValues.current.idroom = values.idroom
    setEnterInChat(true)
  }
  const leaveFromChat = () => {
    setEnterInChat(false)
  }
  return (
    <>
      {!enterInChat && (
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item<IFieldFormType>
            name='username'
            rules={[{ required: true, message: 'Введите свое имя' }]}
          >
            <Input placeholder='Имя' />
          </Form.Item>
          <Form.Item<IFieldFormType>
            name='idroom'
            rules={[{ required: true, message: 'Введите ID комнаты' }]}
          >
            <Input maxLength={5} placeholder='ID комнаты' />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ margin: 'auto', display: 'block' }}
              type='primary'
              htmlType='submit'
            >
              Вход в чат
            </Button>
          </Form.Item>
        </Form>
      )}
      {enterInChat && (
        <Chat
          leaveFromChat={leaveFromChat}
          name={formValues.current.username}
          room={formValues.current.idroom}
        />
      )}
    </>
  )
}

export default App
