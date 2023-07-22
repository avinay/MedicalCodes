import React, { useState } from 'react';
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import useGoogleSheets from 'use-google-sheets';
import { List } from 'semantic-ui-react';
import { Input, Button } from 'semantic-ui-react';



export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useGoogleSheets({
    apiKey: 'AIzaSyDfxjE8deMFqtLDFcKewEMGdDEc7YoN_Nk',
    sheetId: '1qiSo93OEmix3buiNsE_XYSZS8hwxNmy__rzfB69cxXQ',
  });
  let filterRows = [];
   

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }
 
  
  
  const searchCodes = () => {
    console.log(searchTerm);
   // setSearchTerm(val);
    console.log("test",searchTerm, data[0].data.filter(row => row["Codes"].toLowerCase().includes(searchTerm)));
  filterRows = data[0].data.filter(row => row["Codes"].toLowerCase().includes(searchTerm));
  };
  
  
  return <div>
    <Input focus placeholder='Search...'  onChange={(e) => setSearchTerm(e.target.value)} />
    <Button primary onClick={searchCodes(data, searchTerm)}>Primary</Button>
     <List divided relaxed>
      {filterRows.map((object, i) =>
        <List.Item>
           <List.Content> 
              <List.Header as='a'>{object["Codes"]} </List.Header>
        <List.Description as='a'>{object["Description"]} </List.Description>
             
           </List.Content>
        </List.Item>)}
    
  </List>
   
  </div>;
}
