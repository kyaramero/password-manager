import React from 'react'

interface SubmitButtonProps {
  buttonText: string
  onClick: (e: React.FormEvent) => void
}

const BtnSubmit: React.FC<SubmitButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button type="submit" className="btn btn-primary" onClick={() => onClick}>
      {buttonText}
    </button>
  )
}

export default BtnSubmit
