import React, {useEffect, useRef, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useParams, BrowserRouter
} from "react-router-dom";
import './App.css';

function Home() {
  // @ts-ignore
  return <div>

    <h1>Shit code</h1>
    <p>Shit code counter by <a href='https://yank0vy3rdna.ru'>yank0vy3rdna</a></p>
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

function AddShit() {
  let id;
  ({id} = useParams());
  const code_container = useRef(null);

  function send() {
    fetch("/shitten_api/shits/", {
      "method": "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      "body": JSON.stringify({
        "code": code_container.current.value,
        "user_id": id
      })
    }).then(
        r => r.json().then((data) => {
              window.location.href = "/shit/shat/" + data['user_name']
            }
        )
    )
  }

  return <div>
    <h5>Введи код</h5>
    <form style={{width: "60wh"}}>
      <textarea ref={code_container} style={{height: "30vh", width: "100%"}} cols="100" name="code"/><br/>
      <input type='button' value="Send" onClick={send}/>
    </form>
  </div>;
}

function App() {
  return (
      <div className="App">
        <Router>
          <div style={{margin: "auto"}}>
            <Switch>
              <Route path="/shit/add_shit/:id">
                <AddShit/>
              </Route>
              <Route path="/shit/shat/:name">
                <ShitPage/>
              </Route>
              <Route path="/shit/">
                <Home/>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
  );
}

export default App;
