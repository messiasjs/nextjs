"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';


//Coloque o código dos demais componentes aqui...
function FilterableMessageTable({ messages }) {
  const [filterText, setFilterText] = useState('');
  //const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText}/>
      <MessageTable messages={messages} filterText={filterText} />
    </div>
  ); 
}

function SearchBar({filterText,onFilterTextChange}) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

function MessageTable({ messages, filterText}) {
  const rows = [];
  let lastCategory = null;
  console.log("Aqui -------------"+messages);
  console.log(typeof(messages));

  messages.forEach((message) => {
    if (message.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    
    /*if (messages.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }*/
    rows.push(
      <MessageRow
        message={message}
        key={message.name} />
    );
    //lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function MessageRow({ message }) {
  /*const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;*/

  return (
    <tr>
      <td>{message.name}</td>
      <td>{message.author}</td>
    </tr>
  );
}

export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);
  
  fetch(' https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec')
    .then(response => response.json())
    .then(response => {
        setBlogMessages(response);
    });

    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages} />
      </main>
    )
}

