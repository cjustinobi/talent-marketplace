import { useEffect, useState } from 'react'
import { getVendors, test } from '../utils'
import VendorCard from '../components/VendorCard'


const Home = () => {

  const [vendors, setVendors] = useState(undefined)

  const getVendorsHandler = async () => {
    const res = await getVendors()
    setVendors(res)
  }

  useEffect(() => {

    getVendorsHandler()
    test()

  }, [getVendors])

  return (
    <div className="item-list">

        <div className="grid grid-cols-3 gap-4 mt-10">
          {vendors && vendors.map(vendor => (

            <VendorCard
              key={vendor.id}
              id={vendor.id}
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

