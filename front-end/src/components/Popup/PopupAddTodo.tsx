import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import Popup from '.'
import { Todo } from "../Content"

interface PopupSendEmailProps {
  closePopup: () => void
  show: boolean
  className?: string
  itemTodo?: Todo
  submitDataPopup: (data: Inputs) => void
}

const schema = yup.object().shape({
  description: yup
    .string()
    .required("Thông tin không được bỏ trống"),
  isFinished: yup
    .boolean()
    .required("Thông tin không được bỏ trống")
    .typeError("Thông tin không hợp lệ"),
})


interface Inputs {
  description: string
  isFinished: boolean
}

const PopupAddTodo = ({
  closePopup,
  show,
  submitDataPopup,
  itemTodo
}: PopupSendEmailProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState,
} = useForm({ resolver: yupResolver(schema), defaultValues: itemTodo });

const { errors }: any = formState;

  const onSubmit = (dataInput: any) => {
    submitDataPopup(dataInput)
  }
  return (
    <Popup
      closePopup={() => {
        closePopup()
      }}
      show={show}
      title="Add Todo"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-2 z-[9999]">
        <div>
          <label htmlFor="crud-form-1" className="form-label">
            Description
          </label>
          <input
            id="crud-form-1"
            type="text"
            className="form-control w-full border-2 rounded-md p-1"
            placeholder="Enter description"
            {...register("description")}
          />
          {
            errors?.description &&
            <p className="text-sm text-red-700 mt-1 ml-1">{errors?.description?.message}</p>
          }
        </div>
        <div className="my-1 flex flex-col">
          <label htmlFor="crud-form-1" className="form-label">
            Status
          </label>
          <select {...register("isFinished")} className="border-2 rounded-md p-1">
            <option value="true">Done</option>
            <option value="false">Not done</option>
          </select>
          {
            errors?.isFinished &&
            <p className="text-sm text-red-700 mt-1 ml-1">{errors?.isFinished?.message}</p>
          }
        </div>
        <div className="flex mt-3 items-center justify-end space-x-2 pr-5 mb-2">
          <div
            className="bg-white border-[1px] border-[#183ed4] text-black rounded-lg p-2 hover:opacity-90 min-w-[50px] text-center"
            onClick={() => closePopup()}
          >
            Cancel
          </div>
          <button type="submit" className="rounded-lg p-2 text-white bg-[#183ed4] hover:opacity-90 min-w-[70px] ">
            Add
          </button>
        </div>
      </form>
    </Popup>
  )
}

export default PopupAddTodo
