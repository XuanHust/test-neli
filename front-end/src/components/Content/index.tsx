import { useEffect, useState } from "react"
import PopupAddTodo from "../Popup/PopupAddTodo"
import todoAPI from "../../services/todo.service"
import { TodoInputParams } from "../../models/todo"

export interface Todo {
  id: number
  description: string
  isFinished: boolean
}

const Content = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [dataTodo, setDataTodo] = useState<Todo[]>([])
  const [itemTodo, setItemTodo] = useState<Todo>()

  const getDataTodo = async () => {
    const data = await todoAPI.getTodos({description: undefined})
    setDataTodo(data.data)
  }

  const createTodo = async (data: TodoInputParams) => {
    try {
      await todoAPI.createTodo(data)
    } catch (error) {
      console.log("error", error)
    }finally{
      getDataTodo()

    }
  }

  const editTodo = async (id: number, data: TodoInputParams) => {
    try {
      await todoAPI.updateTodo(id, data)
    } catch (error) {
      console.log("error", error)
    } finally {
      getDataTodo()

    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await todoAPI.deleteTodoId(id)
    } catch (error) {
      console.log("error", error)
    } finally {
      getDataTodo()
    }
  }

  useEffect(() => {
    getDataTodo()
  }, [])

  return <div className="w-full flex justify-center items-center">
    <div className="w-full">
      <div className="w-full text-4xl font-bold text-center text-[#646681] p-3">TODO APP</div>
      <div className="w-full flex flex-col space-y-2 justify-center items-center">
        <div className="w-1/2 flex justify-between items-center">
          <button className="p-2 bg-[#4961ec] text-white font-semibold text-base rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out"
            onClick={() => {
              setShowPopup(true)
              setItemTodo(undefined)
            }}
          >
            Add Todo
          </button>
        </div>
        <div className="bg-[#ededf3] w-1/2 p-4 rounded-lg max-h-[500px] overflow-auto">
            {
              dataTodo.length ? dataTodo.map(item => (
                <div className="flex items-center justify-between mb-2 bg-white rounded-lg p-2">
                  <p className="pr-2">
                    <p>Description: {item.description}</p>
                    <p>Status: {`${item.isFinished ? 'Done' : 'Not done'}`}</p>
                  </p>
                  <div className="flex space-x-2">
                    <p className="p-2 bg-amber-300 rounded-lg cursor-pointer hover:opacity-80"
                    onClick={() => {
                      setShowPopup(true)
                      setItemTodo(item)
                    }}
                    >Edit</p>
                    <p className="p-2 bg-red-600 rounded-lg cursor-pointer hover:opacity-80"
                    onClick={() => deleteTodo(item.id)}
                    >Delete</p>
                  </div>
                </div>
              )):
              <div>Data is empty</div>
            }
        </div>
      </div>
    </div>
    {showPopup && (
      <PopupAddTodo
        closePopup={() => {
          setShowPopup(false)
        }}
        show={showPopup}
        submitDataPopup={async (data) => {
          itemTodo ? editTodo(itemTodo.id, data) : createTodo(data)
          setShowPopup(false)
        }}
        itemTodo={itemTodo}
      />
    )}
  </div>
}
export default Content