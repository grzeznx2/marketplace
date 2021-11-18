import { useEffect, useState } from 'react'
import useSWR from 'swr'

export const createUseAccount = (web3, provider) => () => {
  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  }

  const getKey = () => (web3 ? 'web3/accounts' : null)

  const { mutate, ...rest } = useSWR(getKey, getAccount)

  useEffect(() => {
    provider && provider.on('accountsChanged', accounts => mutate(accounts[0] ?? null))
  }, [provider])

  return {
    account: { mutate, ...rest },
  }
}
