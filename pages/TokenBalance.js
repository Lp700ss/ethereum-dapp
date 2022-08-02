import { useERC20Balances } from "react-moralis";

const TokenBalance = () => {
  const { fetchERC20Balances, data, isLoading, isFetching, error, name } =
    useERC20Balances();

  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button
        onClick={() =>
          fetchERC20Balances({
            params: {
              address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
              chain: "goerli",
            },
          })
        }
      >
        Fetch the USDC Token and other ERC20 test token
      </button>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>

      {/* <h4>{JSON.stringify(data.address, null, 2)}</h4> */}
    </div>
  );
};

export default TokenBalance;
