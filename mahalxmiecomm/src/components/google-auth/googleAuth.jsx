import React, { useEffect, useRef } from 'react'
import { myActionsUsers } from '../../reducers/userReducers'
import { useDispatch } from 'react-redux'
const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

const GoogleAuth = () => {

// useRef is a React Hook that lets you reference a value that’s not needed for rendering. const ref = useRef(initialValue) Reference.
  const googleButton = useRef(null);
  const dispatch=useDispatch();

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = "633810885953-85alf0v18r2ua96otadi65meseo9ib80.apps.googleusercontent.com"

    loadScript(src)
      .then(() => {
      
        /*global google*/
        
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current,
          { theme: 'outline', size: 'large' }
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])

  function handleCredentialResponse(response) {
    if (response.credential) {
      var data = { "auth_token": response.credential }
      fetch("http://127.0.0.1:8000/google/",
        {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
        .then((res) => res.json())
        .then((res) => {
          res = res.replace(/'/g, '"');
          let jsonObject = JSON.parse(res);
        
          if(jsonObject.tokens !== '' || jsonObject.tokens !== undefined){
            dispatch({
              type: myActionsUsers.LOGIN_SUCCESS,
              payload: jsonObject,
            });
            localStorage.setItem('userInfo',JSON.stringify(jsonObject))  
          }
          
        })

    }
  }

  return (
    <div id='google-login-btn'>
    <div ref={googleButton} id='google-ref'></div>
    </div>
    
  )
}

export default GoogleAuth;