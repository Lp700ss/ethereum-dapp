import React from "react";
import { useMoralis } from "react-moralis";
import styles from "../styles/DashBoard.module.css";
import Link from "next/link";

function DashBoard() {
  const { isAuthenticated, logout } = useMoralis();
  return (
    <div>
      <nav>
        <ul className={styles.nav_container}>
          <Link href="/TokenBalance">
            <a>TokenBalance</a>
          </Link>
          <Link href="/CheckAllowance">
            <a>CheckAllowance</a>
          </Link>
          <Link href="/SetAllowance">
            <a>SetAllowance</a>
          </Link>
          <Link href="/SendErc20">
            <a>Send ERC20</a>
          </Link>

          <button onClick={logout}>Sign out</button>
        </ul>
      </nav>
    </div>
  );
}

export default DashBoard;
