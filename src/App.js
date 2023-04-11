import './App.css';
import { useEffect, useState } from 'react';
import { Users } from './users.js';
import Table from './Table';
import axios from 'axios';
function App() {
  const [query, setQuery] = useState("");
  const [data, setData]=useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:5000?q=${query}`); 
      setData(res.data);
    };
    if(query.length === 0 || query.length > 2 ) fetchUsers();
    },[query])

  const res = Users.filter((item) => item.first_name.toLowerCase().includes(query));
  const keys =['first_name','last_name','email']
  const search = (data) => {
        return data.filter(
          (item) => keys.some( key => item[key].toLowerCase().includes(query)))}
  return (
    <div className="app">
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      {/* <ul className="list">
        {Users.filter((item) => item.first_name.toLowerCase().includes(query)).map((user) => (
          <li className="listItem" key={user.id}>
            {user.first_name}
          </li>
        ))}
      </ul> */}
      <Table data={data}/>
    </div>
  );
}

export default App;
