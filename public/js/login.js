const login = async (event) => {
    event.preventDefault();
  
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    console.log(username, password)
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log(response)
  
      if (response.ok) {
        document.location.replace('/dashboard')
      }
      else {
        alert('filleralert')
      }
    }
  };

  const createAccount = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    console.log(username, password)
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard')
        console.log(response)
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document.querySelector('#login').addEventListener('click', login);
  document.querySelector('#createAccount').addEventListener('click', createAccount);