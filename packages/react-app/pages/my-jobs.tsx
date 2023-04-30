import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getVendorTransactions } from '@/utils'
import JobCard from '@/components/JobCard'

const MyJobs = () => {

  const { address } = useAccount()

  const [transactions, setTransactions] = useState<any[]>([])

  const getTransactionsHandler = async () => {
    setTransactions(await getVendorTransactions(address))
  }

  useEffect(() => {

    getTransactionsHandler()

  }, [getVendorTransactions])

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-10">
        {transactions && transactions.map(tx => (
          <JobCard
            key={tx.transactionIndex}
            id={tx.transactionIndex}
            customer={tx.customer}
            created={tx.dateCreated.toString()}
            completed={tx.dateCompleted.toString()}
            status={tx.status}
            getTransactionsHandler={getTransactionsHandler}
          />
        ))}
      </div>
    </>

  )
}

export default MyJobs