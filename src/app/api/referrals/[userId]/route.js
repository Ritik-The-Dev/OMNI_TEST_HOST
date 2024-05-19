import { getTreeNodes } from "@/lib/backendFunctions/referral";
import { Coupon } from "@/lib/models/coupon";
import { User } from "@/lib/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    try {
        const {from} = req.nextUrl.searchParams?.get('from') || '';
        const header = headers();
        let userId ; 
        if(from == 'params'){
            userId = params.userId 
        }else{
            userId = header.get('userId');;
        }
        const user = await User.findById(userId);

        if(!user) NextResponse.json({msg: "User not found! try later"}, {status:404});

        const referrals = await User.find({referredBy: user.referralCode}, {_id:1, phone:1, name:1, status:1});
        // const spr = await User.find({referredBy:"XDZBHWX7VO49", status:"Active"}, {phone:1, status:1, name:1})
        // const userTre = await getTreeNodes(user);
        // const matchingNo = [];
        // // userTre.map(e=>{
        // //     spr.map(s=>{
        // //         if(s.phone == e.phone){
        // //             // console.log(e);
        // //             matchingNo.push(e);
        // //             return e.phone;
        // //         }else{
        // //             return null;
        // //         }
        // //     })
        // // })
        // // const coupon = [];
        // // matchingNo.map(async elem=>{
        // //     const cup = await Coupon.find({user:elem._id}, {quantity:1, amount:1});
        // //     // console.log(elem)
        // //     cup.map(e=>{
        // //         console.log(e)
        // //         coupon.push(e)
        // //     })
        // // })

        // // console.log(coupon)

        return NextResponse.json({msg:'successfull', referrals:referrals.reverse()});
    } catch (error) {
        console.error("Error while fetching data! referrals userId", error.message)
        return NextResponse.json({msg:'Internal Server Error', error:error.message}, {status:500})
    }
}
export const maxDuration = 600;
export const dynamic = 'force-dynamic';