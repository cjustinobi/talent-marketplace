import { ethers } from 'ethers'
import { approve, timestampToDate, STATUS, truncate } from '../utils'
import { useAccount } from 'wagmi'

interface TransactionCardProps {
  id: number
  customer: string
  status: number
  dateCreated: number
  getTransactionsHandler: () => void;
}



const TransactionCard: React.FC<TransactionCardProps> = ({
    id,
    customer,
    status,
    created,
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

  const { address } = useAccount()

  const approveHandler = async (id, address) => {
    await approve(id.toString(), address)
    getTransactionsHandler()
  }

  return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="font-light">{truncate(customer)}</h2>
        <small>Created: {timestampToDate(created)}</small>
        <div className="flex justify-between mt-3">
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
          {/*<span className="font-light">{ethers.utils.formatEther(amount)} CELO</span>*/}
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
          {(STATUS(status) === 'InProgress') && <div className="flex justify-between">
            <button onClick={() => cancelHandler(id, vendor)} className="mt-3 mr-1 bg-slate-200 w-28 rounded">
              Cancel
            </button>
            <button onClick={() => approveHandler(id, vendor)} className="mt-3 ml-1 bg-[#87CEEB] w-28 rounded">
              Approve
            </button>
          </div>}
      </div>
  )
}

export default TransactionCard
