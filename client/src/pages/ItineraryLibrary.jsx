
import { useState, useEffect } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import countries from '../data/countries.json'
import ItineraryCard from '../components/ItineraryCard'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ItineraryLibrary() {
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState()
  const [countryItinerary, setCountryItinerary] = useState({})
  
  console.log(selectedCountry)
  console.log(countryItinerary)
  
  // useEffect(() => {
  //   const showItineraries = () => {
  //     fetch("/api/itineraries/searchcountry", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(selectedCountry.name),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCountryItinerary(data);
  //       })
  //       .catch((error) => console.log(error));
  //   };
  //   showItineraries();
  // }, [selectedCountry]);
  
  const filteredCountry =
    query === ''
      ? countries
      : countries.filter((country) => {
          return country.name.toLowerCase().includes(query.toLowerCase())
        })
  
        
        

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
    <div className="header text-center text-5xl font-bold mt-5">
    Explore travel guides and itineraries
    </div>
    <Combobox as="div" value={selectedCountry} onChange={setSelectedCountry}>
      <Combobox.Label className="max-w-screen-sm block text-sm font-medium text-gray-700">Search for a destination</Combobox.Label>
      <div className="relative mt-1">
     
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          //displayValue={(country) => country.name }
        />
        
        
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredCountry.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCountry.map((country) => (
              <Combobox.Option
                key={country.id}
                value={country}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{country.name}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="header text-left text-2xl font-bold mt-20">
    Recent Itineraries
    </div>
    <ItineraryCard/>
    </div>

    </div>
  )
}
