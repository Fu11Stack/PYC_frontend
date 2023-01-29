import {
 createSelector,
 createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({})

const initialState = notesAdapter.getInitialState()

export const notesApiSLice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getnotes: builder.query({
          query: () => '/notes',
          validateStatus: (response, result) => {
              return response.status === 200 && !result.Error
          },
          keepUnusedDatafor: 5,
          transformResponse: responseData => {
              const loadednotes = responseData.map(note => {
                  note.id = note._id
                  return note
              });
              return notesAdapter.setAll(initialState, loadednotes)
          },
          providedTags: (result, error, arg) => {
              if (results?.ids) {
                  return [
                      { type: 'Note', id:'LIST' },
                      ...results.ids.map(id => ({ type: 'Note', id }))
                  ]
              } else return [{ type: 'Note', id: 'LIST' }]
          }
      }),
  }),
})

export const {
useGetNotesQuery,
} = notesApiSLice

// returns the query results object 
export const selectnotesResult = noteApiSlice.endpoints.getnotes.select()

// creates momoized selector
const selectNotesData = createSelector(
 selectnotesResult,
 noteResult => noteResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring 

export const {
 selectAll: selectAllNotes,
 selectById: selectNoteById,
 selectIds: selectNoteIds
 // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)