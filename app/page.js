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

function SearchBar({filterText, onFilterTextChange}) {
  return (
    <form>
      Procure uma mensagem:
      <input type="text" value={filterText} placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

function MessageTable({ messages, filterText}) {
  const rows = [];
  let lastCategory = null;
  console.log(filterText);
  messages.forEach((message) => {
    //if (message[0].toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
    //  return;
    //}
    //console.log(filterText);
    /*if (messages.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }*/
    rows.push(
      <MessageRow message={message}/>
    );
    //lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Message</th>
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
      <td>{message[1]}</td>
      <td>{message[0]}</td>
      <td>{message[2]}</td>
    </tr>
  );
}

export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);
  
  fetch(' https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec')
    .then(response => response.json())
    .then(data => {
        setBlogMessages(data);
    });
    
    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages} />
      </main>
    )
}

