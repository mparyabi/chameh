import RequireLogin from '@/app/checkout/RequireLogin'
import React from 'react'
import AddressModel from '@/models/Address' 
import { authUser } from '@/utils/auth';

async function Address() {
    const user =await authUser();
    let addresses =[];
    if(user){
    addresses = await AddressModel.find({_id:user.addresses }).lean();
    }
    
  return (
    <RequireLogin user={user} addresses={addresses} from={"p-user"}/>
  )
}

export default Address