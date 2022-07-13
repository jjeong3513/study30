import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import { getList,addList } from './store/list/listSlice';
import List from './components/List';


function App() {
  const dispatch = useDispatch();
  const listdata = useSelector((state)=> state.list)
  const [listValue, setListValue] = useState('')
  useEffect(()=>{
    dispatch(getList())
    },[])
  const onCreate = (e)=>{
    e.preventDefault();
    if(listValue){
      const newList = {content:listValue}
      dispatch(addList(newList))
      setListValue('')
    }
  }
  return (
    <div className="App">
     <form onSubmit={onCreate}>
       <h1>{listdata.message}</h1>
       <div>
         {
          listdata.data.map((ele)=> <List key={ele.id} id={ele.id} content={ele.content} />)
         }
       </div>
       <div>
         <input type="text" 
         onChange={(e)=> setListValue(e.target.value)}
         value={listValue}
          />
         <button type="submit">목록추가</button>
       </div>
     </form>
    </div>
  );
}

export default App;
