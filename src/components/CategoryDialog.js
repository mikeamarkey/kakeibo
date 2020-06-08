import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField
} from '@material-ui/core'
import produce from 'immer'

import { FlexSpacer } from 'src/components'
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from 'src/graphql/queries'

const CategoryDialog = ({ dialogContent, setDialogContent }) => {
  const [form, setForm] = useState(dialogContent)
  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    update (store, { data: { createCategory } }) {
      const cache = store.readQuery({ query: GET_CATEGORIES })
      const data = produce(cache, (draft) => {
        draft.getCategories.data.push(createCategory)
      })
      store.writeQuery({ query: GET_CATEGORIES, data })
    }
  })
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    update (store, { data: { deleteCategory } }) {
      const cache = store.readQuery({ query: GET_CATEGORIES })
      const data = produce(cache, (draft) => {
        draft.getCategories.data = draft.getCategories.data.filter((item) => {
          return item._id !== deleteCategory._id
        })
      })
      store.writeQuery({ query: GET_CATEGORIES, data })
    }
  })
  const disabled = !form.name

  function handleCreate () {
    createCategory({
      variables: {
        data: { ...form }
      }
    })
    handleClose()
  }

  function handleUpdate () {
    const { name } = form
    updateCategory({
      variables: {
        id: form._id,
        data: { name }
      }
    })
    handleClose()
  }

  function handleDelete () {
    deleteCategory({ variables: { id: form._id } })
    handleClose()
  }

  function handleClose () {
    setDialogContent(null)
  }

  return (
    <Dialog
      open
      onClose={() => handleClose()}
      aria-labelledby='form-dialog-title'
      transitionDuration={100}
    >
      <DialogContent>
        <TextField
          id='name'
          type='text'
          label='Name'
          margin='dense'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        {form._id && (
          <>
            <Button color='secondary' onClick={() => handleDelete()}>Delete</Button>
            <FlexSpacer />
          </>
        )}
        <Button onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          color='primary'
          disabled={disabled}
          onClick={form._id
            ? () => handleUpdate()
            : () => handleCreate()}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryDialog
