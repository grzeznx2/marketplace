import { useEffect, useState } from 'react'
import useSWR from 'swr'

const adminAdresses = {
  '0xcf28be2976ae625dcad54c788ab8481fb38b9580593f092ad8c1028f025921f3': true,
}

export const createUseAccount =
  ({ web3, provider }) =>
  () => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts()
      return accounts[0]
    }

    const getKey = () => (web3 ? 'web3/accounts' : null)

    const { mutate, data, ...rest } = useSWR(getKey, getAccount)

    useEffect(() => {
      provider && provider.on('accountsChanged', accounts => mutate(accounts[0] ?? null))
    }, [provider])

    return {
      data,
      isAdmin: (data && adminAdresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest,
    }
  }
