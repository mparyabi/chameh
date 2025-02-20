import styles from './product.module.css';
import Moreitems from '@/components/templates/Product/Moreitems/Moreitems';
import Moreproducts from '@/components/templates/Product/MoreProducts/Moreproducts';
import Iconbar from '@/components/modules/Iconbar/Iconbar';
import connectToDB from '@/utils/db';
import ProductModel from '@/models/Product'
import Infos from '@/components/templates/Product/Infos/Infos';



async function Product({params}) {

    await connectToDB();
    const {id}=params;
    const product = await ProductModel.findById(id , '-__v').populate("collections" ).lean();
    // بررسی وجود محصول
if (!product) {
  return <div>محصول پیدا نشد</div>; // یا هر چیزی که برای مدیریت این حالت مناسب باشد
}
    const moreItem = await ProductModel.find({collections:product.collections,_id: { $ne: id }}).limit(10).lean();
  return (<>
    
    <Infos product = {product}/>

    <div className={styles.HeaderContainer}> 
    <img style={{rotate:'180deg'}} src='/images/collections/logo.png'/>
    <div className={styles.Text}>آیتم های بیشتر</div>
    <div style={{fontSize:'12pt', marginTop:'7pt'}}>برای تکمیل استایل شما</div>
    </div>

    <Moreitems moreItem={moreItem}/>

    <div className={styles.HeaderContainer}> 
    <img style={{rotate:'180deg'}} src='/images/collections/logo.png'/>
    <div className={styles.Text}> موارد بیشتر</div>
    <div style={{fontSize:'12pt', marginTop:'7pt'}}>لباس های مرتبط با استایل شما</div>
    </div>

    <Moreproducts moreItem={moreItem}/>

    <Iconbar/>
    </>
  )
}

export default Product