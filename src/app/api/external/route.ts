import { NextResponse } from "next/server";

const external_api_url = "https://jsonplaceholder.typicode.com/posts";

export async function GET() {
    try {
       const response = await fetch(external_api_url) 

       if (!response.ok) {
        return NextResponse.json(
          {success: false,massage:"data fetched"},{status: response.status}
        )
       }

       const data = await response.json()

       return NextResponse.json(
        {success: true, data}
       )

    } catch (error: any) {
        return NextResponse.json(
            {success: false, message: "getting an error", error: error.message}
        )
    }
}