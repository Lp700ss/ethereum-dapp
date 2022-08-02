import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../components/Login';
import {useMoralis} from "react-moralis";
import DashBoard from '../components/DashBoard';

export default function Home() {

const {isAuthenticated} = useMoralis();

  return (
   <div>
    {
      isAuthenticated ? (
        
       <DashBoard/>  
       

      ): (
        <Login/>
      )
    }    
   </div>
  )
}
