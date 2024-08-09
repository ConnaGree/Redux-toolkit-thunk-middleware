import { Provider } from "react-redux"
import { store } from "./app/store"
import PostForm from "./components/post/PostForm"
import PostsContainer from "./components/post/PostsContainer"

function App() {
  return (
    <Provider store={store}>
      <main className=" w-full flex flex-col justify-center gap-[2rem] items-center bg-[#040934] text-white">
        <PostForm />
        <PostsContainer />
      </main>
    </Provider>
  )
}

export default App
