'use client';

import React, { useEffect, useState } from 'react';
import styles from './products.module.css';

const AdminProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' }); // اضافه کردن مدیریت مرتب‌سازی

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          setProducts(data.products);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (err) {
        setError('خطا در دریافت محصولات');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    if (confirm('آیا از حذف این محصول مطمئن هستید؟')) {
      try {
        const res = await fetch(`/api/product/${productId}`, {
          method: 'DELETE',
        });
        if (res.status === 200) {
          setProducts(products.filter((product) => product._id !== productId));
          alert("محصول با موفقیت حذف شد!")
        }
      } catch (err) {
        console.error('خطا در حذف محصول', err);
      }
    }
  };

  const handleEditProduct = (productId) => {
    // انتقال به صفحه ویرایش محصول
    window.location.href = `/p-admin/products/edit/${productId}`;
  };

  // تابع مرتب‌سازی
  const sortData = (data, config) => {
    if (!config.key) return data;

    const sortedData = [...data].sort((a, b) => {
      if (a[config.key] < b[config.key]) return config.direction === 'ascending' ? -1 : 1;
      if (a[config.key] > b[config.key]) return config.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return sortedData;
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = sortData(products, sortConfig);

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>مدیریت محصولات</h2>
      <input
        type="text"
        placeholder="جستجوی محصول..."
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading ? (
        <div className={styles.loading}>در حال بارگزاری...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div className={styles.noProducts}>محصولی یافت نشد...</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
            <th>
                پیش نمایش 
              </th>
              <th onClick={() => handleSort('name')}>
                نام محصول {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '⬆️' : '⬇️')}
              </th>
              <th onClick={() => handleSort('category')}>
                دسته‌بندی {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '⬆️' : '⬇️')}
              </th>
              <th onClick={() => handleSort('price')}>
                قیمت {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '⬆️' : '⬇️')}
              </th>
              <th onClick={() => handleSort('stock')}>
                 موجودی {sortConfig.key === 'stock' && (sortConfig.direction === 'ascending' ? '⬆️' : '⬇️')}
              </th>
              <th>مدیریت</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.thumbnail ?<img className={styles.preview} src={`${product.thumbnail}`}/> : <div>بدون تصویر</div> }</td>
                <td>{product.name}</td>
                <td>{product.collections.map((category)=>(category.name))}</td>
                <td>{product.price.toLocaleString('fa-IR')} تومان</td>
                <td>
                  {product.stock ? (
                    <span className={styles.activeStatus}>موجود</span>
                  ) : (
                    <span className={styles.inactiveStatus}>ناموجود</span>
                  )}
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditProduct(product._id)}
                  >
                    ویرایش
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProductsTable;
