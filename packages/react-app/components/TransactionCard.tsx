import Image from 'next/image'
import { ethers } from 'ethers'
import {
  approve,
  cancelService,
  timestampToDate,
  STATUS
} from '../utils'

interface TransactionCardProps {
  id: number
  businessName: string
  amount: number
  vendor: string
  image: string
  status: number
  created: number
  completed: number
  transCount: number
  totalAmount: number
  getTransactionsHandler: () => void;
}



const TransactionCard: React.FC<TransactionCardProps> = ({
    id,
    businessName,
    amount,
    vendor,
    image,
    status,
    created,
    completed,
    transCount,
    totalAmount,
    getTransactionsHandler
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


  const approveHandler = async () => {
    await approve(id.toString(), vendor)
    getTransactionsHandler()
  }


  const cancelHandler = async () => {
    await cancelService(id.toString(), vendor)
    getTransactionsHandler()
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
        <small>Transactions: {transCount}</small>
        <small>Total Earnings: {totalAmount}</small>
        <small className="block">Created: {timestampToDate(created)}</small>
        <small>Completed: {status === 3 ? timestampToDate(completed) : ''}</small>
        <div className="flex justify-between mt-2">
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
          {(STATUS(status) === 'Cancelled') && <button disabled className="mt-3 bg-slate-300 w-28 rounded">
            Cancelled
          </button>}
          {(STATUS(status) === 'InProgress') || (STATUS(status) === 'Reviewing') && <div className="flex justify-between">
            <button onClick={cancelHandler} className="mt-3 mr-1 bg-slate-200 w-28 rounded">
              Cancel
            </button>
            <button onClick={approveHandler} className="mt-3 ml-1 bg-[#87CEEB] w-28 rounded">
              Approve
            </button>
          </div>}
      </div>
  );
};

export default TransactionCard
