import { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { ISelector, Selectors, IServerData } from './types';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Container from './Container';

const App: FC = () => {

  const [dataForSend, setDataForSend] = useState<string>('');
  const [selected, setSelected] = useState<string>(Selectors[0].name);

  const [dataForDelete, setDataForDelete] = useState<string>('');
  const [selectedDelete, setSelectedDelete] = useState<string>(Selectors[0].name);

  const [serverData, setServerData] = useState<Array<IServerData>>([]);

  useEffect(() => {
    axios.get('http://178.62.195.246:3000/testingdb').then(data => {setServerData(data.data)});
  },[])
  
  console.log(serverData);

  
  const onSendInformation = (): void => {
    if(dataForSend.length && selected.length){
      let id = Selectors.filter(el => {return el.name === selected})[0].id;
      let idInArr = serverData.findIndex((el: any) => el.app_id === id);
      if(serverData[idInArr].account_ids.length < 15){
        axios.post('http://178.62.195.246:3000/updatedb', {id, dataForSend});
      }
      else{
        alert('Достигнуто максимальное кол-во id')
      }
    }
    else{
      alert('Проверьте заполненность полей');
    }
  }

  const onDeleteInformation = (): void => {
    if(dataForDelete.length && selectedDelete.length){
      let id = Selectors.filter(el => {return el.name === selectedDelete})[0].id;
      axios.post('http://178.62.195.246:3000/deletedb', {id, dataForDelete});
    }
    else{
      alert('Проверьте заполненность полей!');
    }
  }

  const onChangeText = (event: BaseSyntheticEvent): void => {
    setDataForSend(event.target.value);
  }

  
  const onChangeDeleteAppID = (event: BaseSyntheticEvent): void => {
    event.stopPropagation();
    event.preventDefault();
    setDataForDelete(event.target.value);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
  }

  const handleDeleteChange = (event: SelectChangeEvent) => {
    setSelectedDelete(event.target.value);
  }

  // console.log(Selectors)
  return (
    <div className="App">
      <div className='App-center'>


        <h2>Добавление аккаунтов</h2>
        <h5>Выберите приложение из списка</h5>
        <FormControl>
          <Select value={selected} onChange={handleChange}>
            {Selectors.map(el => { return <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem> })}
          </Select>
        </FormControl>
        <h5>Введите ID аккаунтов через запятую без кавычек<br/>Пример: "2991397620933658, 2296705047024331"</h5>
        <textarea onChange={(event: BaseSyntheticEvent) => onChangeText(event)}></textarea>
        <button onClick={onSendInformation}>Добавить</button>


        <h2>Удаление аккаунтов</h2>
        <h5>Выберите приложение из списка</h5>
        <FormControl>
          <Select value={selectedDelete} onChange={handleDeleteChange}>
            {Selectors.map(el => { return <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem> })}
          </Select>
        </FormControl>
        <h5>Введите ID аккаунта без кавычек<br/>Пример: "2991397620933658, 2296705047024331"</h5>
        <textarea onChange={(event: BaseSyntheticEvent) => onChangeDeleteAppID(event)}></textarea>
        <button onClick={onDeleteInformation}>Удалить</button>


      </div>
      <div className='Side-table'>
        <h2>Приложения</h2>
        <ul>
          {serverData?.map((el:any) => {
            return <Container key={el._id} app_id={el.app_id} account_ids={el.account_ids}/>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
