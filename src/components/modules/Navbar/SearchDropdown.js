"use client"
import React, { useState , useEffect } from 'react'
import styles from './searchdropdown.module.css'
import Link from 'next/link';

function SearchDropdown() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // اگر تعداد حروف وارد شده کمتر از سه حرف باشد، نتایج جستجو را پاک کنید
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }

    // انجام جستجو با وارد کردن سه حرف یا بیشتر
    const fetchResults = async () => {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const data = await response.json();
      setResults(data.data);
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div className={styles.dropdown}>
     <input
     className={styles.searchInput}
     type='text'
     placeholder='جستجوی محصولات ...'
     value={searchQuery}
     autoFocus
     onChange={(e) => setSearchQuery(e.target.value)}
     ></input>
      
      <ul className={styles.cartListContainer}>
        {results.length === 0 && searchQuery.length >= 3 ? (
          <li className={styles.noProduct}>محصولی یافت نشد</li>
        ) : (
          results.map((item) => (
            <li className={styles.cartItem} key={item._id}>
              <Link href={`/product/${item._id.toString()}`} style={{ color: "inherit", display: "flex" }}>
                <img className={styles.itemImg} src={item.thumbnail} />
                <div className={styles.itemName}>
                  {item.name} <br />
                  <div className={styles.itemPrice}>{item.price.toLocaleString('fa-IR')} تومان</div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>        

    </div>
  )
}

export default SearchDropdown