import React, { ChangeEvent } from 'react'

interface TextInputProps {
  formData: { [key: string]: string }
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
  type: string
  id: string
}

const TextInput: React.FC<TextInputProps> = ({
  formData,
  handleChange,
  label,
  type,
  id,
}) => {
  return (
    <div className="form-group ">
      <label htmlFor={type}>{label}:</label>
      <input
        type={type}
        className="form-control form-control-lg"
        id={id}
        name={id}
        value={formData[id]}
        onChange={handleChange}
        required
      />
    </div>
  )
}

export default TextInput
