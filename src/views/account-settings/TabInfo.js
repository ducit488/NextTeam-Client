// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import axios from 'axios'
import { Autocomplete, Box } from '@mui/material'
import { Country, State, City } from 'country-state-city'
import { updateUserInfo } from '../../pages/user/apiUtils'
import { Cookie } from 'mdi-material-ui'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = ({ userInfo, setUserInfo, majors }) => {
  // ** State

  const [currentUserInfo, setCurrentUserInfo] = useState({ ...userInfo })

  const [date, setDate] = useState(
    currentUserInfo != null && currentUserInfo.dob != null ? new Date(currentUserInfo.dob) : null
  )

  useEffect(() => {
    setCurrentUserInfo({ ...userInfo })
  }, [userInfo.id])

  const [country, setCountry] = useState(
    userInfo?.homeTown != '' && userInfo?.homeTown != null
      ? Country.getCountryByCode(userInfo?.homeTown.split('-')[0])
      : null
  )

  const [state, setState] = useState(
    userInfo?.homeTown != '' && userInfo?.homeTown != null && userInfo.homeTown.includes('-')
      ? State.getStateByCodeAndCountry(userInfo.homeTown.split('-')[1], userInfo.homeTown.split('-')[0])
      : null
  )

  const [states, setStates] = useState(
    userInfo?.homeTown != '' && userInfo?.homeTown != null
      ? State.getStatesOfCountry(userInfo?.homeTown.split('-')[0])
      : null
  )

  const [countries, setCountries] = useState(Country.getAllCountries())

  const handleSubmit = event => {
    event.preventDefault()
    updateUserInfo(currentUserInfo).then(response => {
      setUserInfo({ ...currentUserInfo })
      console.log('update detail info: ', response)
    })
  }

  const handleReset = event => {
    event.preventDefault()
    setCurrentUserInfo({ ...userInfo })
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              value={`The name’s ${
                currentUserInfo.lastname || 'John'
              }. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Student code'
              placeholder='(123) 456-7890'
              value={currentUserInfo?.studentCode || ''}
              onChange={event => {
                setCurrentUserInfo(current => {
                  return { ...current, studentCode: event.target.value }
                })
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Major'
              placeholder='(123) 456-7890'
              value={currentUserInfo?.major || ''}
              onChange={event => {
                setCurrentUserInfo(current => {
                  return { ...current, major: event.target.value }
                })
              }}
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='major-label'>Major</InputLabel>
              <Select
                labelId='major-label'
                id='major'
                value={currentUserInfo?.major || ''}
                label='Major'
                onChange={event => {
                  setCurrentUserInfo(current => {
                    return { ...current, major: event?.target.value }
                  })
                }}
              >
                {majors != ''
                  ? majors.map(major => (
                      <MenuItem key={major.id} value={major.id}>
                        {major.name}
                      </MenuItem>
                    ))
                  : ''}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Phone'
              placeholder='(123) 456-7890'
              value={currentUserInfo?.phoneNumber || ''}
              onChange={event => {
                setCurrentUserInfo(current => {
                  return { ...currentUserInfo, phoneNumber: event.target.value }
                })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={date => {
                  setCurrentUserInfo(current => {
                    return { ...current, dob: date.toISOString().split('T')[0] }
                  })
                  setDate(date)
                }}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Autocomplete
                value={country}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setCurrentUserInfo(current => {
                      return { ...current, homeTown: newValue.isoCode }
                    })

                    setCountry(newValue)
                    setStates(State.getStatesOfCountry(newValue.isoCode))
                  }
                }}
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={(props, option) => (
                  <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading='lazy'
                      width='20'
                      srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                      alt=''
                    />
                    {option.name} ({option.isoCode}) +{option.phonecode}
                  </Box>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Choose a country'
                    inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Autocomplete
                value={state}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setCurrentUserInfo(current => {
                      return { ...current, homeTown: country.isoCode + '-' + newValue.isoCode }
                    })

                    setState(newValue)
                  }
                }}
                sx={{ width: 300 }}
                options={states}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={(props, option) => (
                  <Box component='li' {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='City'
                    inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Facebook Url'
              placeholder='https://www.facebook.com/profile.php?id=[user_id]'
              value={currentUserInfo?.facebookUrl || ''}
              onChange={event => {
                setCurrentUserInfo(current => {
                  return { ...current, facebookUrl: event.target.value }
                })
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='LinkedIn Url'
              placeholder='https://www.linkedin.com/in/[user_id]/'
              value={currentUserInfo.linkedInUrl || ''}
              onChange={event => {
                setCurrentUserInfo(current => {
                  return { ...current, linkedInUrl: event.target.value }
                })
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth></FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup
                onChange={event => {
                  setCurrentUserInfo(current => {
                    return { ...currentUserInfo, gender: event.target.value }
                  })
                }}
                row
                value={currentUserInfo.gender || 'Male'}
                aria-label='gender'
                name='account-settings-info-radio'
              >
                <FormControlLabel value='Male' label='Male' control={<Radio />} />
                <FormControlLabel value='Female' label='Female' control={<Radio />} />
                <FormControlLabel value='Others' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
