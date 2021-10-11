import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; Care-X Social Service Community.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="" target="_blank" rel="noopener noreferrer">Thanish Ahamed</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
