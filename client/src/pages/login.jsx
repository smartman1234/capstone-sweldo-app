const Login = () => {
  return (
    <div className=''>
      <div>
        <div className='mb-4'>
          <h1 className='text-3xl font-bold'>Sweldo App</h1>
        </div>
        {/* Input */}
        <div className='mb-8 space-y-4'>
          <div>
            <label htmlFor='username' className='block'>Username</label>
            <input type='text' placeholder='Username' className='border' />
          </div>
          <div>
            <label htmlFor='password' className='block'>Password</label>
            <input type='password' placeholder='Password' className='border' />
          </div>
        </div>
        {/* Login */}
        <div>
          <button>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
