function status(request, response) {
  response.status(200).json({ chave: "meu amigo" })
}

export default status