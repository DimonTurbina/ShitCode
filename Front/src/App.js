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

function LogInPage() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      "login": login.target.value,
      "password": password.target.value
    })
    fetch("/shitten_api/auth/", {
      "method": "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "login": login.target.value,
        "password": password.target.value
      })
    }).then(
        r => r.json().then((data) => {
              window.location.href = "/shit/sgithat/" + data['user_name']
            }
        )
    )
  }
  return <div>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          <div className="five columns">Login:</div>
          <div className="five columns"><input type="text" value={login.current} onChange={setLogin}/></div>
        </label>
        <label>
          <div className="five columns">Password:</div>
          <div className="five columns"><input type="text" value={password.current} onChange={setPassword}/></div>
        </label>
        <div className="five columns">
          <input type="submit" value="Отправить"/>
        </div>
      </form>
    </div>
  </div>
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
        <div style={{margin: "auto"}}>
          <h1>ShitCode</h1>
          <LogInPage/>
          {/*<Router>*/}
          {/*        <Switch>*/}
          {/*            <Route path="/shit/add_shit/:id">*/}
          {/*                <AddShit/>*/}
          {/*            </Route>*/}
          {/*            <Route path="/shit/shat/:name">*/}
          {/*                <ShitPage/>*/}
          {/*            </Route>*/}
          {/*            <Route path="/shit/">*/}
          {/*                <Home/>*/}
          {/*            </Route>*/}
          {/*        </Switch>*/}
          {/*</Router>*/}
        </div>
      </div>
  );
}

export default App;
