import Link from 'next/link'
import React from 'react'

const SecondaryBtn = ({href,children}:any) => {
  return (
    <div className="relative p-[2px] rounded-xl bg-gradient-to-br from-blue-300 to-purple-600 hover:from-purple-300 hover:to-purple-600 transition ease-in-out duration-200 font-bold z-0">
  <div className="flex items-center justify-center h-full bg-[#f2f8fc] dark:bg-[#1b1c1e] rounded-xl">
    <Link href={href} className="px-5 py-3 rounded-xl">
      {children}
    </Link>
  </div>
</div>

  )
}

export default SecondaryBtn