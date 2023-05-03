import { useEffect, useState } from 'react'
import { getVendors } from '../utils'
import VendorCard from '../components/VendorCard'

interface UserData {
  id: string;
  rating: string;
  earnings: string;
  transactionCount: any;
  image: any;
  businessName: any;
  price: any;
  vendor: any;
}

const Home = () => {

  const [vendors, setVendors] = useState<UserData | undefined>(undefined)

  const getVendorsHandler = async () => {
    const res = await getVendors()
    setVendors(res)
  }

  useEffect(() => {

    getVendorsHandler()

  }, [getVendors])

  return (
    <div className="item-list">

        <div className="grid grid-cols-3 gap-4 mt-10">
          {vendors && vendors.map(vendor => (

            <VendorCard
              key={vendor.id}
              id={vendor.id.toString()}
              rating={vendor.rating.toString()}
              earnings={vendor.totalAmount.toString()}
              transactionCount={vendor.transCount.toString()}
              image={vendor.filePath}
              businessName={vendor.businessName}
              price={vendor.price}
              vendor={vendor.vendorAddress}
              getVendorsHandler={getVendorsHandler}
            />
          ))}
      </div>
    </div>
  )
}

export default Home

