import { providers, Contract } from 'ethers'
import Lottery from '../../hardhat/artifacts/contracts/TalentMarketPlace.sol/TalentMarketPlace.json'
import { priceToWei } from './helpers'

export const contractAddress = '0x389D265Bb40f1275CFd6Edb92EF1D26884A937ff'

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

export const getVendorTransactions = async address => {
  try {
    const contract = await getContract()
    const txCount = await contract.getVendorTransactionCount()

    let txs = []

    for (let i = 0; i < txCount; i++) {
      const tx = await contract.getVendorTransactions(i, address)
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

export const approve = async (index, vendorAddress) => {

  try {
    const contract = await getContract()

    let res = await contract.confirmService(index, vendorAddress)
    return await res.wait()


  } catch (e) {
    console.log(e)
  }
}

export const sendForReview = async (index, customerAddress) => {

  try {
    const contract = await getContract()

    let res = await contract.serviceReviewing(index, customerAddress)
    return await res.wait()


  } catch (e) {
    console.log(e)
  }
}


export const cancelService = async (index, customerAddress) => {

  try {
    const contract = await getContract()

    let res = await contract.cancelService(index, customerAddress)
    return await res.wait()


  } catch (e) {
    console.log(e)
  }
}

export const vendorCancelService = async (index, customerAddress) => {

  try {
    const contract = await getContract()

    let res = await contract.vendorCancelService(index, customerAddress)
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

  // https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg

