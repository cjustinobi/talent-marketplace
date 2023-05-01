import {
  sendForReview,
  vendorCancelService,
  timestampToDate,
  STATUS,
  truncate
} from '../utils'

interface TransactionCardProps {
  id: number
  customer: string
  status: number
  created: number
  completed: number
  getTransactionsHandler: () => void;
}

const JobCard: React.FC<TransactionCardProps> = ({
    id,
    customer,
    status,
    created,
    completed,
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

  const reviewHandler = async () => {
    await sendForReview(id.toString(), customer)
    getTransactionsHandler()
  }

  const cancelHandler = async () => {
    await vendorCancelService(id.toString(), customer)
    getTransactionsHandler()
  }

  return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="font-light">{truncate(customer)}</h2>
        <small className="block">Created: {timestampToDate(created)}</small>
        <small>Completed: {status === 3 ? timestampToDate(completed) : ''}</small>
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
          <span className={`status ${STATUS(status)}`}>{STATUS(status)}</span>
        </div>

          {(STATUS(status) === 'Cancelled') && <button disabled className="mt-3 bg-slate-300 w-28 rounded">
            Cancelled
          </button>}
          {(STATUS(status) === 'InProgress') && <div className="flex justify-between">
            <button onClick={cancelHandler} className="mt-3 mr-1 bg-slate-200 w-28 rounded">
              Cancel
            </button>
            <button onClick={reviewHandler} className="mt-3 ml-1 bg-[#87CEEB] w-28 rounded">
              Submit
            </button>
          </div>}
      </div>
  )
}

export default JobCard
