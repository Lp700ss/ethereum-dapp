import styles from "../styles/Login.module.css";
import Image from "next/image";
import icon from "./Images/eth-png.png";
import { useMoralis } from "react-moralis";

function Login() {
  const { authenticate, authError } = useMoralis();
  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <Image src={icon} width={150} height={200} />
        <div className={styles.sign_in_container}>
          {authError && (
            <p className={styles.error}>
              {authError.name}
              {authError.message}
             
            </p>
          )}
          <button onClick={authenticate}>Login with Metamask</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
