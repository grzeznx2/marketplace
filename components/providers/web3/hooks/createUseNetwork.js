import { useEffect } from 'react'
import useSWR from 'swr'

export const createUseNetwork = (web3, provider) => () => {
  const getKey = () => (web3 ? 'web3/network' : null)

  const getNetId = async () => {
    const netId = await web3.eth.net.getId()
    return netId
  }

  const { mutate, ...rest } = useSWR(getKey, getNetId)

  useEffect(() => {
    provider && provider.on('chainChanged', netId => mutate(netId))
  }, [provider])

  return {
    network: {
      mutate,
      ...rest,
    },
  }
}
