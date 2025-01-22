import { makeStyles } from 'tss-react/mui'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { Button } from '@mui/material'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorCard } from './ErrorCard'

export function RouteError() {
  const error = useRouteError()
  const { classes } = useStyles()
  const navigate = useNavigate()

  const onHome = useCallback(() => {
    navigate('/home')
  }, [navigate])

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className={classes.notFoundWrapper}>
          <h1>404</h1>
          <p style={{ marginBottom: '2em' }}>{'404'}</p>
          <Button size="large" variant="contained" onClick={onHome}>
            {'home'}
          </Button>
        </div>
      )
    }
  }

  return (
    <div className={classes.appErrorWrapper}>
      <ErrorCard
        title={'application error'}
        description={'serious error prompt'}
        details={error as Error}
      />
    </div>
  )
}

const useStyles = makeStyles({ name: { RouteError } })(() => ({
  notFoundWrapper: {
    fontSize: '2rem',
    margin: '2em',
  },
  appErrorWrapper: {
    fontSize: '2rem',
    margin: '2em auto',
    maxWidth: 700,
  },
}))
