import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getTransactions, test } from '@/utils'
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
            key={tx.transactionIndex}
            id={tx.transactionIndex}
            vendor={tx.vendor}
            image={tx.filePath}
            amount={tx.amount.toString()}
            businessName={tx.businessName}
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

export default MyTransactions