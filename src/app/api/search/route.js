import ProductModel from '@/models/Product'
import connectToDB from '@/utils/db';

export async function GET(req){
const { searchParams } = new URL(req.url);
const query = searchParams.get('query');

if (!query) {
    return new Response(JSON.stringify({ message: 'Query parameter is required' }), { status: 400 });
}

try {
    await connectToDB();
    const products = await ProductModel.find({
        name: { $regex: query, $options: 'i' }, 
    }).limit(5);
    return new Response(JSON.stringify({ message: "Product Found!"  , data: products }), { status: 200 });

} catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
}


}

