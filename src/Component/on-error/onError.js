import { Alert } from 'antd'

export default function OnError() {
  return (
    <Alert
      style={{ margin: 'auto' }}
      message="Предупреждение!"
      description="Только фильмы с вашей оценкой есть в этом списке."
      type="error"
      showIcon
    />
  )
}
