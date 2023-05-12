"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';


//Coloque o código dos demais componentes aqui...
function FilterableMessageTable({ messages }) {
  const [filterText, setFilterText] = useState('');

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
      <label>Procure uma mensagem:</label>
      {' '}
      <input width="100%" type="text" value={filterText} placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

/*function s(e) {
  let {messages: t, filterText: n} = e
    , i = [];
  return t.forEach(e=>{
      if (e[0] && "string" == typeof e[0] && e[0].toLowerCase().indexOf(n.toLowerCase()) >= 0 || e[1] && "string" == typeof e[1] && e[1].toLowerCase().indexOf(n.toLowerCase()) >= 0) {
          let t = new Date(e[2])
            , n = t.toLocaleDateString("en-GB")
            , o = t.toLocaleTimeString("en-GB", {hour12: !1}), a = "".concat(n, " ").concat(o);
          i.push((0,
          r.jsx)(u, {
              date: a,
              author: e[1],
              message: e[0]
          }, e.join()))
      }
  }
*/
function MessageTable({ messages, filterText}) {
  const rows = [];
  let lastCategory = null;
  console.log(filterText);
  messages.forEach((message) => {
    /*console.log('--------1', message[0].toLowerCase());
    console.log('--------2',filterText);
    console.log(('-------3', message[0].toLowerCase().indexOf(filterText.toLowerCase())));

    if(message[0].toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      console.log("AQUI _____________________________________");
      return;
    }*/
    //console.log(filterText);
    /*if (messages.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }*/
    if (message[0] && "string" == typeof(message[0]) && message[0].toLowerCase().indexOf(filterText.toLowerCase()) >= 0 || message[1] && "string" == typeof(message[1]) && message[1].toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {

      rows.push(
        <MessageRow message={message}/>
      );
    }
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
  let newDate = new Date(e[2]), n =newDate.toLocaleDateString("en-GB"), o = newDate.toLocaleTimeString("en-GB", {hour12: !1}), a = "".concat(n, " ").concat(o);
  //const newDate = new Date(message[2]);
  //console.log(newDate);
  console.log(n);
  console.log(o);
  console.log(a);
  var formatDate = newDate.toLocaleString('pt-BR', { timezone: 'UTC' });
  
  return (
    <tr>
      <td>{message[1]}</td>
      <td>{message[0]}</td>
      <td>{a}</td>
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

