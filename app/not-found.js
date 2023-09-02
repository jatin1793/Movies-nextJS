"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


function notfound() {
  const router = useRouter()

  useEffect(()=>{
    setTimeout(()=>{
       router.push("../../../../../")
      }, 2000);
  })
  return (
    <div style={{height: "100vh" , width: "100vw", zIndex: "9999" , position: "absolute" , }}>
      <div>
        <h3 style={{ marginTop: "40vh" , padding: "0vh 30vw" , }}>404 page not found</h3>
        <p style={{  padding: "0vh 30vw"}}>We are sorry but the page you are looking for does not exist.</p>
      </div>
      
    </div>
  )
}

export default notfound