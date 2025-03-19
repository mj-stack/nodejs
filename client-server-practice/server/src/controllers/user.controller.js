const loginUser = async (req, res) => {
  console.log(req.body)
  res.send('User registered')
}

export {loginUser}