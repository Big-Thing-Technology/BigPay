'use client'

import { useTheme } from '@mui/material/styles'
import React, { useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/table-core'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@/components/@extended/Avatar'
import { PatternFormat } from 'react-number-format'
import { Add, Edit, Eye, Trash } from 'iconsax-react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@/components/@extended/IconButton'
import { ThemeMode } from '@/config'
import ReactTable from '@/components/table/react-table'
import Loader from '@/components/Loader'
import AddMemberModal from '@/module/member/add-member-modal'
import EditMemberModal from '@/module/member/edit-member-modal'
import AlertMemberDelete from '@/module/member/alert-member-delete'

const listMember = [
  {
    id: '6708c1982ae01c77e6f595fb',
    fullName: 'Kỳ Khôi',
    email: 'toakira123@gmail.com',
    phoneNumber: '0705045677',
    joiningDate: 'test',
    isOwner: true,
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJn5K8n3BXLvJnQvvRn6O5GlzG2ecRj3TVZ4HgQjU4f129a2jk=s96-c',
  },
  {
    id: '6708c3402ae01c77e6f595fc',
    fullName: 'Nguyen Flag',
    email: 'devquocky@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJpaBB7rA3QYtx3RrRsUv6Xf0OOVT-iRsXg8qOWFnnCrtWlWr0c=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
  {
    id: '6708c3542ae01c77e6f595fd',
    fullName: 'Nguyễn Quốc Kỳ',
    email: 'nguyenquocky77@gmail.com',
    phoneNumber: '0966673492',
    joiningDate: 'test',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
  },
]

export default function MemberList() {
  const theme = useTheme()

  const [loading] = useState(false)

  const [addMemberModal, setAddMemberModal] = useState<boolean>(false)
  const [editMemberModal, setEditMemberModal] = useState<boolean>(false)
  const [deleteMemberModal, setDeleteMemberModal] = useState<boolean>(false)
  const [selectedMember, setSelectedMember] = useState<any | null>(null)

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'fullName',
        cell: ({ row, getValue }) => (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar alt={getValue() as string} size="sm" src={row.original.avatar} />
            <Stack spacing={0}>
              <Typography variant="subtitle1">{getValue() as string}</Typography>
              <Typography color="text.secondary">{row.original.email as string}</Typography>
            </Stack>
          </Stack>
        ),
      },
      {
        header: 'Email',
        accessorKey: 'email',
        meta: {
          className: 'cell-left',
        },
      },
      {
        header: 'Mobile',
        accessorKey: 'phoneNumber',
        cell: ({ getValue }) => (
          <PatternFormat
            displayType="text"
            format="####.###.###"
            mask="_"
            defaultValue={getValue() as number}
          />
        ),
      },
      {
        header: 'Joining Date',
        accessorKey: 'joiningDate',
      },
      // {
      //   header: 'Status',
      //   accessorKey: 'status',
      //   cell: (cell) => {
      //     switch (cell.getValue()) {
      //       case 3:
      //         return <Chip color="error" label="Rejected" size="small" variant="light" />
      //       case 1:
      //         return <Chip color="success" label="Verified" size="small" variant="light" />
      //       case 2:
      //       default:
      //         return <Chip color="info" label="Pending" size="small" variant="light" />
      //     }
      //   },
      // },
      {
        header: 'Actions',
        meta: {
          className: 'cell-center',
        },
        disableSortBy: true,
        cell: ({ row }) => {
          const collapseIcon =
            row.getCanExpand() && row.getIsExpanded() ? (
              <Add style={{ color: theme.palette.error.main, transform: 'rotate(45deg)' }} />
            ) : (
              <Eye />
            )
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton color="secondary" onClick={row.getToggleExpandedHandler()}>
                  {collapseIcon}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    setSelectedMember(row.original)
                    setEditMemberModal(true)
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  sx={{
                    ':hover': {
                      color:
                        theme.palette.mode === ThemeMode.DARK
                          ? theme.palette.common.white
                          : theme.palette.error[100],
                    },
                  }}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    setSelectedMember(row.original)
                    setDeleteMemberModal(true)
                  }}
                >
                  <Trash />
                </IconButton>
              </Tooltip>
            </Stack>
          )
        },
      },
    ],
    [theme]
  )

  return (
    <>
      {loading && <Loader />}
      <ReactTable
        {...{
          data: listMember,
          columns,
          modalToggle: () => {
            setAddMemberModal(true)
            setSelectedMember(null)
          },
        }}
      />

      <AddMemberModal open={addMemberModal} modalToggler={setAddMemberModal} />
      <EditMemberModal
        open={editMemberModal}
        modalToggler={setEditMemberModal}
        member={selectedMember}
      />
      <AlertMemberDelete
        open={deleteMemberModal}
        modalToggler={setDeleteMemberModal}
        member={selectedMember}
      />
    </>
  )
}
