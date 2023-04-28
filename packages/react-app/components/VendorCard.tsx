import { ethers } from 'ethers'
import { createTransaction, timestampToDate, lotteryElapsed, truncate } from '../utils'
import { useAccount } from 'wagmi'

interface VendorCardProps {
  id: number
  businessName: string
  price: number
  vendor: string
  // endLotteryHandler: (id: number) => void;
}



const VendorCard: React.FC<VendorCardProps> = ({
    id,
    businessName,
    price,
    vendor

     // endLotteryHandler
   }) => {

  const { address } = useAccount()

  const hire = (id, address, price) => {
    createTransaction(id.toString(), address, price.toString())
    // console.log(price)
  }

  return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="mb-4 font-bold">{businessName} <br/>
        <span className="font-light">{ethers.utils.formatEther(price)} CELO</span></h2>
        {/*<div className="flex justify-between">*/}
        {/*  <div className="mr-4">*/}
        {/*    <p>Participants</p>*/}
        {/*    <span>{participants}</span>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <p>End Date</p>*/}
        {/*    <span>{timestampToDate(endTime.toNumber())}</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div>*/}
          {(vendor !== address) && <button onClick={() => hire(id, vendor, price)} className="mt-3 bg-slate-300 w-28 rounded">
            Hire
          </button>}
        {/*  {!ended && lotteryElapsed(endTime) && <button onClick={() => endLotteryHandler(id)} className="mt-3 bg-slate-300 w-28 rounded">*/}
        {/*    End Lottery {ended}*/}
        {/*  </button>}*/}
        {/*  {ended && <div><button disabled className="mt-3 bg-slate-200 w-28 rounded">*/}
        {/*    Lottery Ended*/}
        {/*  </button>*/}
        {/*  <br/>*/}
        {/*  <small>Winner: {truncate(winner)}</small>*/}
        {/*  </div>}*/}
        {/*</div>*/}
      </div>
  );
};

export default VendorCard
