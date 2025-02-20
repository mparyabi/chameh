import { cookies } from "next/headers";

export function POST(req){
    cookies().delete('token');
    return Response.json({message:"logout success"},{status:200});
}