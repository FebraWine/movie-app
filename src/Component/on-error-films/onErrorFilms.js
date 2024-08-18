import { Alert } from 'antd'

export default function OnErrorFilms() {
  return (
    <Alert
      style={{ margin: 'auto' }}
      message="Предупреждение!"
      description="Что-то пошло не так. Ваша аура плохо влияет на окружающих"
      type="error"
      showIcon
    />
  )
}
