import { providers, Contract } from 'ethers'
import { WrapperBuilder } from 'redstone-evm-connector'
import Lottery from '../../hardhat/artifacts/contracts/TalentMarketPlace.sol/TalentMarketPlace.json'
import { priceToWei } from './helpers'

export const contractAddress = '0x7F4397aF898304a0242CF50CaD8D184C6D7B0bA9'

export async function getContract() {

  let contract

  try {
    const { ethereum } = window

    const provider = new providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    contract = new Contract(contractAddress, Lottery.abi, signer)

  } catch (error) {
    console.log("ERROR:", error)
  }
  return contract
}

export const createAccount = async (name, service, imagePath, description, serviceCharge) => {

  try {
    const contract = await getContract()
    const res = await contract.createVendor(name, service, imagePath, description, priceToWei(serviceCharge))
    return await res.wait()
  } catch (e) {
    console.log(e)
  }
}

export const getVendors = async () => {
  try {
    const contract = await getContract()
    const vendorCount = await contract.getVendorCount()

    let vendors = []

    for (let i = 0; i < vendorCount; i++) {
      const vendor = await contract.getVendors(i)
      vendors.push(vendor)
    }
    return vendors

  } catch (e) {
    console.log(e)
  }
}


export const getTransactions = async address => {
  try {
    const contract = await getContract()
    const txCount = await contract.getTransactionCount()

    let txs = []

    for (let i = 0; i < txCount; i++) {
      const tx = await contract.getTransactions(i, address)
      txs.push(tx)
    }
    return txs

  } catch (e) {
    console.log(e)
  }
}

export const createTransaction = async (index, address, value) => {

  try {
    const contract = await getContract()
    let res = await contract.createTransaction(index, address, {value})
    res = await res.wait()
    return res

  } catch (e) {
    console.log(e)
  }
}

export const endLottery = async index => {

  try {
    const contract = await getContract()

    const wrappedContract = WrapperBuilder
      .wrapLite(contract)
      .usingPriceFeed('redstone', { asset: 'ENTROPY' })

    await wrappedContract.authorizeProvider();

    let res = await wrappedContract.pickWinner(index)
    return await res.wait()


  } catch (e) {
    console.log(e)
  }
}

export const test = async () => {

  try {
    const contract = await getContract()
    // let res = await contract.getTime()
    let res = await contract.getBal()
    console.log(res.toString())

  } catch (e) {
    console.log(e)
  }
}

