import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

const Card = props => {
  const [done, setDone] = useState(0)
  let db = firebase.firestore()

  useEffect(() => {
    return db.collection("value").doc("queue").onSnapshot(docs => {
       setDone(docs.data().done);
    });
  });

  const text = props.own - done > 0 ?
    `เหลืออีก ${props.own - done} คิว` :
    `ถึงคิวคุณแล้ว
    กรุณามารับ`
  return <>
      <div id="text">
        <h1>{text}</h1>
        <h3>ตอนนี้ถึงคิวที่ {done}</h3>
        <h3>คุณเป็นคิวที่ {props.own} ของวัน</h3>
      </div>
    <style jsx>{`
      div {
        width: 70vw;
        height: 30vh;
        border-radius: 10px;
        box-shadow: 10px 10px 15px -2px rgba(0,0,0,0.1);
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 10px;
      }
      div#circle {
          background: black;
          width: 20px;
          height: 20px;
          margin: 0;
      }
      h1, h3 {
        margin: 0.5px;
        color: #686868;
        font-family: Kanit, Sarabun;
      }
      h1 {
          color: #242424;
          font-size: 36px;
          text-align: center;
      }
      h3 {
          font-size: 24px;
      }
      @media screen and (max-width: 330px) {
          h1 {
              font-size: 30px;
          }
          h3 {
              font-size: 18px;
          }
      }
    `}</style>
  </>
}

export default Card