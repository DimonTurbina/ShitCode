import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function Home() {
  // @ts-ignore
  return <div>

    <h1>Shit code</h1>
  </div>;
}

function ShitPage() {
  let name;
  ({name} = useParams());
  const [data, setData] = useState({
    "count_codes": 0,
    "count_lines": 1,
    "examples": [{
      "id": 1,
      "code": "",
      "user_name": ""
    }]
  });
  useEffect(() => {
    fetch("/shitten_api/shits/" + name).then(r => r.json().then(data => {
          setData(data)
        })
    )

  }, [name]);
  data['examples'].reverse()
  // @ts-ignore
  let k = data['examples'].map((object, i) => <div><h5>Экспонат номер {i}</h5>
    <pre><code style={{"text-align": "left"}}>{object['code']}</code></pre>
  </div>)

  if (data['count_codes'] === 0)
    k = <></>
  return <div>
    <h3>Автор хуйни: {name}</h3>
    <h4>Количество говнокода: {data['count_codes']}</h4>
    <h4>Количество строк говнокода: {data['count_lines']}</h4>
    {k}
  </div>;
}


function App() {
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
