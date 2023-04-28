import Image from 'next/image'
import { ethers } from 'ethers'
import { createTransaction, timestampToDate, STATUS } from '../utils'
import { useAccount } from 'wagmi'

interface TransactionCardProps {
  id: number
  businessName: string
  amount: number
  vendor: string
  image: string
  status: number
}



const TransactionCard: React.FC<TransactionCardProps> = ({
    id,
    businessName,
    amount,
    vendor,
    image,
    status

     // endLotteryHandler
   }) => {

  const statusStyle = status => {
    switch (status) {
      case 'InProgress':
        return {'backgroundColor': 'red'}
      case 'Reviewing':
        return {'background': 'grey'}
      case 'Completed':
        return {'background': 'green'}
      default:
        return ''
    }
  }

  const { address } = useAccount()

  const hire = (id, address, price) => {
    createTransaction(id.toString(), address, price.toString())
    // console.log(price)
  }

  return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Image
          src={image}
          width="200"
          height="200"
          alt="Product image"
        />
        <h2 className="my-2 font-bold">{businessName}</h2>
        <div className="flex justify-between">
          <style jsx>{`
          .status {
            color: #fefefe;
            border-radius: 8px;
            padding: 0 3px;
          }
        .InProgress { background: LightSteelBlue; }
        .Reviewing { background: grey; }
        .Completed { background: green; }
      `}</style>
          <span className="font-light">{ethers.utils.formatEther(amount)} CELO</span>
          <span className={`status ${STATUS(status)}`}>{STATUS(status)}</span>
        </div>
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
          {(STATUS(status) === 'Cancelled') && <button disabled className="mt-3 bg-slate-300 w-28 rounded">
            Cancelled
          </button>}
          {(STATUS(status) === 'InProgress') && <button onClick={() => hire(id)} className="mt-3 bg-slate-300 w-28 rounded">
            Approve
          </button>}
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

export default TransactionCard
