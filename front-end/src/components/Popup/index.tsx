import classNames from 'classnames'
import React, { memo } from 'react'
import ReactDOM from 'react-dom'
import Icon from '../Icon'

export type PopupSize = 'sm' | 'md' | 'lg'

const Popup = ({
  children,
  closePopup,
  show,
  className,
  title,
  size = 'md'
}: {
  children: React.ReactNode
  closePopup: () => void
  show: boolean
  className?: string
  title?: string
  size?: PopupSize
}): JSX.Element => {
  return ReactDOM.createPortal(
    <>
      {show && (
        <div className="fixed w-screen h-screen left-0 right-0 bottom-0 top-0 flex justify-center items-center z-[1000]">
          <div
            className="bg-black/30 absolute top-0 left-0 right-0 bottom-0 h-full w-full z-50"
            onClick={() => closePopup && closePopup()}
          />
          <div className={`bg-white rounded-lg shadow-md z-[60] ${className}`}>
            <div className="flex justify-between items-center p-3">
              <p className="sm:text-lg font-semibold">{title}</p>
              <Icon
                iconName="X"
                className="h-8 w-8 cursor-pointer text-slate-400"
                onClick={() => {
                  closePopup()
                  document.body.style.overflow = 'auto'
                }}
              />
            </div>
            <hr className={`border-black/[0.08]`} />
            <div className="scrollbar-hidden max-h-[70vh] overflow-auto rounded-lg">
              {children}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}

export default memo(Popup)
