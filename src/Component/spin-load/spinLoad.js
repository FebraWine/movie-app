import { Spin } from 'antd'

export default function SpinLoad() {
  const content = null
  return (
    <div style={{ width: 1000, height: 500 }}>
      <Spin tip="Loading" size="large" style={{ top: 100 }}>
        {content}
      </Spin>
    </div>
  )
}
