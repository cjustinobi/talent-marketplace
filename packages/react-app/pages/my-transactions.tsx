import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getTransactions } from '@/utils'
import TransactionCard from '@/components/TransactionCard'

const MyTransactions = () => {

  const { address } = useAccount()

  const [transactions, setTransactions] = useState(undefined)

  const getTransactionsHandler = async () => {
    setTransactions(await getTransactions(address))
  }

  useEffect(() => {

    getTransactionsHandler()

  }, [getTransactions])

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-10">
        {transactions && transactions.map(tx => (
          <TransactionCard
            image={tx.filePath}
            amount={tx.amount.toString()}
            businessName={tx.businessName}
            created={tx.dateCreated.toString()}
            completed={tx.dateCompleted.toString()}
            status={tx.status}
          />
        ))}
      </div>
    </>

  )
}

export default MyTransactions