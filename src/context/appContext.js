import axios from 'axios'
import '../axios'
import React, { useContext, useEffect, useReducer } from 'react'
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  SET_USER,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
} from './actions'
import reducer from './reducer'

const initialState = {
  user: null,
  isLoading: false,
  jobs: [],
  showAlert: false,
  editItem: null,
  singleJobError: false,
  editComplete: false,
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // register
  const register = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/auth/register`, {
        ...userInput,
      })

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // login
  const login = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/auth/login`, {
        ...userInput,
      })
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
    }
  }

  // logout
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT_USER })
  }

  // fetch jobs
  const fetchJobs = async () => {
    setLoading()
    try {
      const { data } = await axios.get(`/jobs`)
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR })
      logout()
    }
  }

  // create job
  const createJob = async (userInput) => {
    setLoading()
    try {
      const { data } = await axios.post(`/jobs`, {
        ...userInput,
      })

      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: CREATE_JOB_ERROR })
    }
  }
  const deleteJob = async (jobId) => {
    setLoading()
    try {
      await axios.delete(`/jobs/${jobId}`)

      fetchJobs()
    } catch (error) {
      dispatch({ type: DELETE_JOB_ERROR })
    }
  }

  const fetchSingleJob = async (jobId) => {
    setLoading()
    try {
      const { data } = await axios.get(`/jobs/${jobId}`)
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_JOB_ERROR })
    }
  }
  const editJob = async (jobId, userInput) => {
    setLoading()
    try {
      const { data } = await axios.patch(`/jobs/${jobId}`, {
        ...userInput,
      })
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job })
    } catch (error) {
      dispatch({ type: EDIT_JOB_ERROR })
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const newUser = JSON.parse(user)
      dispatch({ type: SET_USER, payload: newUser.name })
    }
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        fetchJobs,
        createJob,
        deleteJob,
        fetchSingleJob,
        editJob,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
