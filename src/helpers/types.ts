export interface IMessage {
  action: string
  text: string
  userName: string
  usersLength?: number
  transactionInfo?: ITransactionInfo | undefined
}
export interface IMessageText  {
  text: string
  userName: string
  color: string
  currentName?: string
  transactionInfo?: ITransactionInfo | undefined
}
export interface IFieldFormType {
  username: string
  password: string
}
export interface ITransactionInfo {
  date: string
  txid: string
  values: string
  walletFrom: string
  walletTo: string
}
export interface IUsersColor {
  [key: string]: string
}
