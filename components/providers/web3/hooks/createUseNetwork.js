import { useEffect } from 'react'
import useSWR from 'swr'

const NETWORKS = {
  1: 'Ethereum Main Network',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
  56: 'Binance Smart Chain',
  1337: 'Ganache',
}

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN]

export const createUseNetwork = (web3, provider) => () => {
  const getKey = () => (web3 ? 'web3/network' : null)

  const getChainId = async () => {
    const chainId = await web3.eth.getChainId()
    return NETWORKS[chainId]
  }

  const { mutate, data, ...rest } = useSWR(getKey, getChainId)

  useEffect(() => {
    provider && provider.on('chainChanged', chainId => mutate(NETWORKS[parseInt(chainId, 16)]))
  }, [provider])

  return {
    network: {
      mutate,
      data,
      targetNetwork,
      isSupported: data === targetNetwork,
      ...rest,
    },
  }
}
