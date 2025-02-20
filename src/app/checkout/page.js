import { authUser } from '@/utils/auth'
import React from 'react'
import RequireLogin from './RequireLogin';
import AddressModel from '@/models/Address'

async function Checkout() {
 const user =await authUser();
 let addresses =[];
 if(user){
 addresses = await AddressModel.find({_id:user.addresses }).lean();
 }
 
  return (
    <>
  <RequireLogin user={user} addresses={addresses} from={'checkout'} />
    </>
  )
}

export default Checkout