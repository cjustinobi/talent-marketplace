import { ethers } from 'ethers'
import Image from 'next/image'
import { createTransaction } from '../utils'
import { useAccount } from 'wagmi'

interface VendorCardProps {
  id: string
  image: string
  rating: string
  earnings: string
  transactionCount: string
  businessName: string
  price: number
  vendor: string
  getVendorsHandler: () => void;
}

const VendorCard: React.FC<VendorCardProps> = ({
    id,
    rating,
    earnings,
    transactionCount,
    image,
    businessName,
    price,
    vendor,
    getVendorsHandler
   }) => {

  const { address } = useAccount()

  const hire = async (id, address, price) => {
    await createTransaction(id, address, price.toString())
    getVendorsHandler()
  }

  return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Image
          src={image}
          width="200"
          height="200"
          alt="business image"
        />
        <h2 className="mb-4 font-bold">{businessName} <br/>
          <span className="font-light">{ethers.utils.formatEther(price)} CELO</span>
        </h2>
        <small>Transactions: {transactionCount}</small><br/>
        <small>Earnings: {ethers.utils.formatEther(earnings)}</small><br/>
        <small>Rating: {rating}</small>
          {(vendor !== address) && <button onClick={() => hire(id, vendor, price)} className="mt-3 bg-slate-300 w-28 rounded">
            Hire
          </button>}
      </div>
  );
};

export default VendorCard
