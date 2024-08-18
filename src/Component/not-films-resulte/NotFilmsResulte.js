import { Alert } from 'antd'

export default function NotFilmsResulte() {
  return (
    <Alert
      style={{ margin: 'auto' }}
      message="Предупреждение!"
      description="Нормально клацай по клаве. (Нет фильмов с таким названием)"
      type="error"
      showIcon
    />
  )
}
