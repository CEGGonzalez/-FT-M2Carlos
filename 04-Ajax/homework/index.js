const [boton] = $('#boton');
const [search] = $('#search');
const [deleteBtn] = $('#delete');
const url = 'http://localhost:5000/amigos';

const listaFriends = (response) => {
  const [lista] = $('#lista');
  lista.innerText = '';
  response.forEach((friend) => {
    const newLista = document.createElement('li')
    newLista.innerText = friend.name;
    lista.append(newLista);    
  });
}
const showFriends = () => {
  $('#lista').empty();
  $.get(url, listaFriends)
}
const searchFriend = () => {
  const [input] = $('#input');
  const id = input.value;
  input.value = '';

  $.get(`${url}/${id}`, (response) => {
    const [amigo] = $('#amigo');
    amigo.innerText = response.name
    
  });
}
const deleteFriend = () => {
  const [inputDelete] = $('#inputDelete');
  const id = inputDelete.value;
  inputDelete.value = '';

  $.ajax({
    type: 'DELETE',
    url: `${url}/${id}`,
    success: (response) => {
      listaFriends(response)
      const [success] = $('#success');
      success.innerText = `Tu amigo de id: ${id} fue borrado`;
    }
  })
}
boton.addEventListener('click', showFriends)
search.addEventListener('click', searchFriend)
deleteBtn.addEventListener('click', deleteFriend)