import React, { useMemo } from 'react'
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table'

interface Password {
  brand: string
  cvc_card: string
  email: string
  exp_card: string
  fk_user_id: string
  name: string
  num_card: string
  password: string
  password_id: string
  type: string
  url: string
}

interface PasswordTableProps {
  data: Password[]
}

export default function PasswordTable({ data }: PasswordTableProps) {
  const columns: MRT_ColumnDef<Password>[] = useMemo(
    () => [
      {
        header: 'Type',
        accessorKey: 'type',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'URL',
        accessorKey: 'url',
      },
      {
        header: 'Card Number',
        accessorKey: 'num_card',
      },
      {
        header: 'Brand',
        accessorKey: 'brand',
      },
      {
        header: 'CVV',
        accessorKey: 'cvc_card',
      },
      {
        header: 'Exp Date',
        accessorKey: 'exp_card',
      },
      {
        header: 'Password',
        accessorKey: 'password',
      },
    ],
    []
  )

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      enableColumnOrdering
      enableGlobalFilter={false}
    />
  )
}
