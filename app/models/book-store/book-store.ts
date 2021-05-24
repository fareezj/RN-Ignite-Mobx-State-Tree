import { Instance, SnapshotOut, types, destroy } from "mobx-state-tree"
import { BookModel } from "../book/book"

/**
 * Model description here for TypeScript hints.
 */
export const BookStoreModel = types
  .model("BookStore")
  .props({
    books: types.array(BookModel)
  })
  .views((self) => ({
    get readBooks() {
      return self.books.filter(book => book.read)
    },
    booksByAuthor(author) {
      return self.books.filter(book => book.author === author)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addBook(book) {
      self.books.push(book)
    },
    clearBook(){
      self.books.clear()
    },
    removeBook(book) {
      destroy(book)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type BookStoreType = Instance<typeof BookStoreModel>
export interface BookStore extends BookStoreType {}
type BookStoreSnapshotType = SnapshotOut<typeof BookStoreModel>
export interface BookStoreSnapshot extends BookStoreSnapshotType {}
export const createBookStoreDefaultModel = () => types.optional(BookStoreModel, {})
