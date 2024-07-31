import Link from 'next/link'
import React from 'react'

const PrimaryBtn = ({href,children,className}:any) => {
  return (
    <div>
        <Link href={href} className=' bg-gradient-to-br from-blue-300 to-purple-600 px-5 py-4 rounded-xl hover:from-purple-300 hover:to-purple-600 transition ease-in-out duration-200 font-bold'>{children}</Link>
    </div>
  )
}

export default PrimaryBtn