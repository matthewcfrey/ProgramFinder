import { useState, useEffect } from 'react'

import Selector from './Selector';
import ProgramCard from './ProgramCard';
import ProgramMap from './ProgramMap';

const ProgramFinder = () => {

  const [programLocations, setProgramLocations] = useState([])
  const [filteredProgramLocations, setFilteredProgramLocations] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [programTypeSearch, setProgramTypeSearch] = useState([])
  const [neighborhoodSearch, setNeighborhoodSearch] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getProgramLocations = async () => {
      const progs = await callPFApi(import.meta.env.VITE_PROGRAM_LOCATION_API, null, 'GET')
      //console.log(progs.context.data)
      if(progs.passed) {
        setProgramLocations(progs.data)
        setFilteredProgramLocations(progs.data)
      }
    }
    getProgramLocations()
  }, []);

    const callPFApi = async (url, bodyObj, method) => {
    try {
        const params = {
          method: method,
          // headers:{
          //     "Authorization": tok,
          // },
          body: JSON.stringify(bodyObj)
        }
        if(!bodyObj) {
          delete params.body
        }
        const response = await fetch(url, params)
        if (!response.ok) {
          const res = await response.json()
          const error = new Error(res.message)
          error.code = "500"
          throw error
        }
        const json = await response.json()
        return {
            passed: 1,
            data: json.data
        }
      } catch (error) {
        setErrorMessage('Error loading data')
        console.log(error.message)
        return {
            passed: 0,
            data: error.message
        }
      }
  }

  const handleReset = () => {
    setSearchKeyword('')
    setProgramTypeSearch('')
    setNeighborhoodSearch('')
    setFilteredProgramLocations(programLocations)
  }

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }

  const filterNeighborhoods = (neigh) => {
    filterAllPrograms(programTypeSearch, neigh, searchKeyword)
  }

  const filterProgramTypes = (ptypes) => {
    filterAllPrograms(ptypes, neighborhoodSearch, searchKeyword)
  }

  const filterAllPrograms = (ptypes, neigh, kw) => {
    const ptypeValues = ptypes && ptypes.length 
    ? ptypes.map(p => p.value)
    : null

    let filteredProgs = programLocations
    filteredProgs = ptypeValues 
    ? filteredProgs.filter(p => ptypeValues.includes(p.main_program_goal))
    : filteredProgs

    const neighValues = neigh && neigh.length
    ? neigh.map(n=>n.value)
    : null

    filteredProgs = neighValues 
    ? filteredProgs.filter(p => neighValues.includes(p.neighborhood))
    : filteredProgs

    filteredProgs = filteredProgs.filter(p => p.program_name.toLowerCase().includes(kw.toLowerCase()))
    console.log(kw)
    console.log(filteredProgs)
    setFilteredProgramLocations(filteredProgs)
  }

  const ProgramTypes = [
    { value: 'Academics', label: 'Academics' },
    { value: 'College & Career Readiness', label: 'College & Career Readiness' },
    { value: 'Community Service', label: 'Community Service' },
    { value: 'Health & Wellness', label: 'Health & Wellness' },
    { value: 'Leadership Development', label: 'Leadership Development' },
    { value: 'Sports & Recreation', label: 'Sports & Recreation' },
    { value: 'Youth Enrichment', label: 'Youth Enrichment' },
    { value: 'Youth Support', label: 'Youth Support' },
  ]

  const Neighborhoods = [
    { value: 'Firestone Park', label: 'Firestone Park' },
    { value: 'North Hill', label: 'North Hill' },
    { value: 'Northwest Akron', label: 'Northwest Akron' },
    { value: 'South Akron', label: 'South Akron' },
    { value: 'Wallhaven', label: 'Wallhaven' },
    { value: 'University of Akron', label: 'University of Akron' },
    { value: 'Other', label: 'Other' },
    { value: 'Kenmore', label: 'Kenmore' },
    { value: 'Goodyear Heights', label: 'Goodyear Heights' },
    { value: 'Ellet', label: 'Ellet' },
    { value: 'Downtown Akron', label: 'Downtown Akron' },
    { value: 'East Akron', label: 'East Akron' },
    { value: 'Middlebury', label: 'Middlebury' },
    { value: 'West Akron', label: 'West Akron' },
    { value: 'West Hill', label: 'West Hill' },
    { value: 'Cascade Valley', label: 'Cascade Valley' },
    { value: 'Summit Lake', label: 'Summit Lake' },
    { value: 'Sherbondy Hill', label: 'Sherbondy Hill' },
    { value: 'Merriman Hills', label: 'Merriman Hills' },
    { value: 'Highland Square', label: 'Highland Square' },
    { value: 'Coventry Crossing', label: 'Coventry Crossing' },
    { value: 'Chapel Hill', label: 'Chapel Hill' },
  ]

  return (
    <div id='ProgramFinder'>
      <div id='FinderHeader'>
        <h1 className='top-header'>Find a Program</h1>
        <p>Whether you’re looking for after school enrichment or summer opportunities, 
          the Youth Success Summit network has something for everyone. 
          There are over 100 providers in the network ranging from enrichment in academics, 
          arts and music, sports and wellness, college and career prep, and so much more!
        </p>
      </div>
      <div id='FinderBody'>
        <h2 className='center-header'>Search Programs</h2>
        <div className='flex-center'>
          <Selector 
            options={ProgramTypes} 
            selectedOptions={programTypeSearch} 
            setSelectedOptions={setProgramTypeSearch} 
            placeholder='All Program Types' 
            filterFunction={filterProgramTypes}
          />
          <Selector 
            options={Neighborhoods} 
            selectedOptions={neighborhoodSearch} 
            setSelectedOptions={setNeighborhoodSearch} 
            placeholder='All Neighborhoods'
            filterFunction={filterNeighborhoods}
          />
        </div>
        <div className='flex-center'>
          <input 
            className='input-boxes' 
            type='text' 
            placeholder='Search By Keyword' 
            onChange={handleSearchKeyword} 
            value={searchKeyword} 
            onKeyDown={e => {
              if (e.key === 'Enter') {
                filterAllPrograms(programTypeSearch, neighborhoodSearch, searchKeyword)
              }
            }}>
          </input>
          <button className='input-button' onClick={handleReset}>Reset</button>
        </div>
        <h2 className='error-message'>{errorMessage}</h2>
        <div>
          <ProgramMap filteredProgramLocations={filteredProgramLocations}/>
        </div>
        <div id='ProgramList'>
          {programLocations.length == 0 && <div className='loading-text'>Loading...</div>}
          {(filteredProgramLocations.length == 0 && programLocations.length > 0) && <div className='loading-text'>No programs match your search...</div>}
          {(filteredProgramLocations.length != 0) && filteredProgramLocations.map((program) => (
            <ProgramCard program={program} key={program.program_site_id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgramFinder