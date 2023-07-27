import React from 'react'

interface SubmitButtonProps {
  buttonText: string
  onClick: (e: React.FormEvent) => void
}

const BtnSave: React.FC<SubmitButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button type="submit" className="btn btn-info " onClick={() => onClick}>
      {buttonText}
    </button>
  )
}

export default BtnSave
