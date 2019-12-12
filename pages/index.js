import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import Card from '../components/card'

import firebase from 'firebase/app'
import 'firebase/firestore'

import firebaseConfig from 'secret.js'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const Main = () => {
  const [now, setNow] = useState(0);
  const [own, setOwn] = useState(0);

  useEffect(() => {
    setOwn(localStorage.getItem("count"))
  })

  useEffect(() => {
    db.collection("value").doc("queue").get().then(
      docs => { 
        if(!localStorage.getItem("count")) {
        let now = docs.data().now
        localStorage.setItem("count", now)
        setNow(now)
        db.collection("value").doc("queue").update({
            now: now + 1
        })
      }
    })
  })

  const resetFunc = () => {
    if (confirm("นี่ไม่ใช่การ Refresh แต่คือการ Reset ข้อมูล จะทำต่อหรือไม่")) {
      db.collection("value").doc("queue").get().then(
        docs => { 
          let now = docs.data().now
          localStorage.setItem("count", now)
          setNow(now)
          db.collection("value").doc("queue").update({
              now: now + 1
          })
      })
    }
  }

  return <>
    <Head>
      <title>Fries</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css?family=Kanit&display=swap" rel="stylesheet"></link>
    </Head>
    <div id="outerContainer">
      <div id="container">
        <h3>Fries by Computer Club</h3>
        <Card now={now} own={own}/>
      </div>

      <button onClick={resetFunc}>Reset Data</button>
    </div>
    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
        Helvetica, sans-serif;
        height: 100vh;
        width: 100%;
        background: linear-gradient(-45deg, #F8CDDA, #1D2B64);
      }
      #outerContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
      }
      h3 {
        color: #eeeeee;
        text-align: center;
        font-weight: 500;
      }
      button { 
        margin-top: 20vh;
        width: 20vw;
        height: 5vh;
        background: #ca3433;
        border-radius: 10px;
        border: 0;
        color: white;
        box-shadow: 10px 10px 15px -2px rgba(0,0,0,0.1);
      }
      `}</style>
  </>
}

export default Main
