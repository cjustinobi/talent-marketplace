import { ethers } from 'ethers'
import { createTransaction, timestampToDate, truncate } from '../utils'
import { useAccount } from 'wagmi'

interface VendorCardProps {
  id: number
  businessName: string
  price: number
  vendor: string
  getVendorsHandler: () => void;
}

const VendorCard: React.FC<VendorCardProps> = ({
    id,
    businessName,
    price,
    vendor,
    getVendorsHandler
   }) => {

  const { address } = useAccount()

  const hire = async (id, address, price) => {
    await createTransaction(id.toString(), address, price.toString())
    getVendorsHandler()
  }

  return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="mb-4 font-bold">{businessName} <br/>
        <span className="font-light">{ethers.utils.formatEther(price)} CELO</span></h2>
          {(vendor !== address) && <button onClick={() => hire(id, vendor, price)} className="mt-3 bg-slate-300 w-28 rounded">
            Hire
          </button>}
      </div>
  );
};

export default VendorCard
