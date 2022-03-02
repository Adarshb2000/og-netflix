import fetch from 'node-fetch'

const recur = (shows) => {
  if (shows instanceof Array) {
    console.log(shows)
  } else {
  }
}

const x = async () => {
  const res = await fetch('http://localhost:3000/get-shows', {
    headers: {
      'x-auth-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsZWhoIiwiaWF0IjoxNjM4Mzg2NzQ0LCJleHAiOjE2MzgzOTM5NDR9.O1dD2ygiB4-Ht5sMxMr3PMsLVglqG3ghNEgMdSJHbc4',
    },
  })

  if (res.ok) {
    const ret = await res.json()
    console.log(ret)
  } else {
    console.log(res)
  }
}

x()
