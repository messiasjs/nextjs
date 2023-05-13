"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';


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
      <br></br>
      <input width="100%" type="text" value={filterText} placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

function MessageTable({ messages, filterText}) {
  const rows = [];

  messages.forEach((message) => {
    if (message[0] && "string" == typeof(message[0]) && message[0].toLowerCase().indexOf(filterText.toLowerCase()) >= 0 || message[1] && "string" == typeof(message[1]) && message[1].toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
      rows.push(
        <MessageRow message={message}/>
      );
    }
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
  let newDate = new Date(message[2]), date =newDate.toLocaleDateString("en-GB"), time = newDate.toLocaleTimeString("en-GB", {hour12: !1}), formatDate = "".concat(date, " ").concat(time);
  
  return (
    <tr>
      <td>{message[1]}</td>
      <td>{message[0]}</td>
      <td>{formatDate}</td>
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

