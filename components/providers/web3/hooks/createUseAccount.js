import { useEffect, useState } from 'react'

export const createUseAccount = web3 => () => {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      setAccount(accounts[0])
    }

    web3 && getAccount()
  }, [web3])

  return {
    account,
  }
}
