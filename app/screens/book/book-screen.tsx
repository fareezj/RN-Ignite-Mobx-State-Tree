/* eslint-disable array-callback-return */
import React, {useState} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextInput, Button, TextStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, typography } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

export const BookScreen = observer(function BookScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { bookStore } = useStores()
  const { books } = bookStore
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  function addBook() {
    bookStore.addBook({
      title, author
    })
  }
  function clearBook() {
    bookStore.clearBook()
  }
  function toggleRead(book) {
    book.toggleRead()
  }
  function deleteBook(book) {
    bookStore.removeBook(book)
  }
  console.log('Read Books: ' + bookStore.readBooks)
  console.log('Books by Fareez: ' + bookStore.booksByAuthor('Fareez').map(res => res.title))
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <TextInput
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        onChangeText={value => setAuthor(value)}
      />
      <Button onPress={addBook} title='Add Book' />
      <Button onPress={clearBook} title='Clear Book'/>
      {
        books.map((book, index) =>
          <>
            <Text style={TEXT} key={index}>{book.title}</Text>
            <Text style={TEXT} onPress={() => toggleRead(book)} >Read: {book.read ? 'Yes':'No' }</Text>
            <Text onPress={() => deleteBook(book)}>Delete</Text>
          </>        
        )
      }
    </Screen>
  )
})
