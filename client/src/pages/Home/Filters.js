import React,{useState} from 'react';


const categories =[
    {
        name: "Electronics",
        value: "electronics"
    },
    {
        name: "Home",
        value: "home"
    },
    {
        name: "Fashion",
        value: "fashion"
    },
    {
        name: "Sports",
        value: "sports"
    },
    {
        name: "Books",
        value: "books"
    },
];


const ages =[
    {
        name: "0-2 years old",
        value: "0-2",
    },
    {
        name: "3-5 years old",
        value: "3-5",
    },
    {
        name: "6-8 years old",
        value: "6-8",
    },
    {
        name: "9+ years old",
        value: "9-20",
    },
]

const statesInIndia = [
    {
        name: 'Andhra Pradesh',
        value:'andhra Pradesh'
    },
    {
        name:'Arunachal Pradesh',
        value: 'arunachal Pradesh'
    },
    {
        name:  'Assam',
        value:  'assam'
    },
    {
        name: 'Bihar',
        value: 'bihar'
    },
    {
        name: 'Chhattisgarh',
        value: 'chhattisgarh'
    },
    {
        name:  'Goa',
        value:  'goa'
    },
    {
        name:  'Gujarat',
        value:  'gujarat'
    },
    {
        name: 'Haryana',
        value: 'haryana'
    },
    {
        name: 'Himachal Pradesh',
        value: 'himachal Pradesh'
    },
    {
        name:  'Jharkhand',
        value:  'jharkhand'
    },
    {
        name: 'Karnataka',
        value: 'karnataka'
    },
    {
        name: 'Kerala',
        value: 'kerala'
    },
    {
        name: 'Madhya Pradesh',
        value: 'madhya Pradesh'
    },
    {
        name: 'Maharashtra',
        value: 'maharashtra'
    }, {
        name: 'Manipur',
        value:'manipur'
    }, {
        name: 'Meghalaya',
        value: 'meghalaya'
    }, {
        name: 'Mizoram',
        value: 'mizoram'
    }, {
        name:'Nagaland',
        value:'nagaland'
    }, {
        name: 'Odisha',
        value: 'odisha'
    }, {
        name: 'Punjab',
        value: 'punjab'
    }, {
        name: 'Rajasthan',
        value: 'rajasthan'
    }, {
        name: 'Sikkim',
        value: 'sikkim'
    }, {
        name:'Tamil Nadu',
        value: 'tamil Nadu'
    }, {
        name: 'Telangana',
        value: 'telangana'
    }, {
        name: 'Tripura',
        value: 'tripura'
    },
    {
        name: 'Uttar Pradesh',
        value: 'uttar Pradesh'
    },
    {
        name: 'Uttarakhand',
        value: 'uttarakhand'
    },
    {
        name:  'West Bengal',
        value:  'west Bengal'
    },

                      
             
]




// function Filters({ showFilters, setShowFilters, filters, setFilters }) {
   
//         // const [selectedLocation, setSelectedLocation] = useState('');
    
//     return (
//         <div className='w-72 flex flex-col'>
//             <div className='flex justify-between '>
//                 <h1 className='text-xl text-orange-900'>Filters</h1>
//                 <i className="ri-close-line text-xl cursor-pointer"
//                 onClick={() => setShowFilters(!showFilters)}></i>
//             </div>


//             <div className='flex flex-col gap-1 mt-5'>
//                 <h1 className='text-gray-600'>Categories</h1>


//                 <div className='flex flex-col '>
//                     {categories.map((category) => {
//                         return (
//                             <div className='flex items-center gap-2'>
//                                 <input type="checkbox" name="category" className='max-width '
//                                 checked={filters.category.includes(category.value)}
//                                 onChange={(e) => {
//                                     if (e.target.checked) {
//                                         setFilters({
//                                             ...filters,
//                                             category: [...filters.category, category.value],
//                                         });
//                                     } else {
//                                         setFilters({
//                                             ...filters,
//                                             category: filters.category.filter(
//                                                 (item) => item !== category.value
//                                             ),
//                                         });
//                                     }
//                                 }}
//                                 />
//                                 <label htmlFor="category">{category.name}</label>
//                             </div>


//                         )
//                     })}
//                 </div>
               


//                 <h1 className='text-gray-600 mt-5'>Ages</h1>
//                 <div className='flex flex-col'>
//                     {ages.map((age) => {
//                         return (
//                             <div className='flex gap-2 items-center'>
//                                 <input
//                                 type='checkbox'
//                                 name='age'
//                                 className='max-width'
//                                 checked={filters.age.includes(age.value)}
//                                 onChange={(e) => {
//                                     if (e.target.checked) {
//                                         setFilters({
//                                             ...filters,
//                                             age: [...filters.age, age.value],
//                                         });
//                                     } else {
//                                         setFilters({
//                                             ...filters,
//                                             age: filters.age.filter(
//                                                 (item) => item !== age.value
//                                             ),
//                                         });
//                                     }
//                                 }}
//                                 />
//                                 <label htmlFor='age'>{age.name}</label>
//                             </div>
//                         )
//                     })}
//                 </div>
//                 <h1 className='text-gray-600'>Location</h1>


// <div className='flex flex-col '>
//     {statesInIndia.map((location) => {
//         return (
//             <div className='flex items-center gap-2'>
//                 <input type="checkbox" name="location" className='max-width '
//                 checked={filters.location.includes(location.value)}
//                 onChange={(e) => {
//                     if (e.target.checked) {
//                         setFilters({
//                             ...filters,
//                             location: [...filters.location, location.value],
//                         });
//                     } else {
//                         setFilters({
//                             ...filters,
//                             location: filters.lo.filter(
//                                 (item) => item !== location.value
//                             ),
//                         });
//                     }
//                 }}
//                 />
//                 <label htmlFor="location">{location.name}</label>
//             </div>
//         ))},
                
    
                          
//                     </div>      

//             </div>
//          </div>


       


//     )
// }


// export default Filters;




function Filters({ showFilters, setShowFilters, filters, setFilters }) {
    return (
      <div className='w-72 flex flex-col'>
        <div className='flex justify-between '>
          <h1 className='text-xl text-orange-900'>Filters</h1>
          <i
            className='ri-close-line text-xl cursor-pointer'
            onClick={() => setShowFilters(!showFilters)}
          ></i>
        </div>
  
        <div className='flex flex-col gap-1 mt-5'>
          <h1 className='text-gray-600'>Categories</h1>
  
          <div className='flex flex-col '>
            {categories.map((category) => (
              <div className='flex items-center gap-2' key={category.value}>
                <input
                  type='checkbox'
                  name='category'
                  className='max-width '
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor='category'>{category.name}</label>
              </div>
            ))}
          </div>
  
          <h1 className='text-gray-600 mt-5'>Ages</h1>
          <div className='flex flex-col'>
            {ages.map((age) => (
              <div className='flex gap-2 items-center' key={age.value}>
                <input
                  type='checkbox'
                  name='age'
                  className='max-width'
                  checked={filters.age.includes(age.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                />
                <label htmlFor='age'>{age.name}</label>
              </div>
            ))}
          </div>
          <h1 className='text-gray-600'>Location</h1>
  
          <div className='flex flex-col '>
            {statesInIndia.map((location) => (
              <div className='flex items-center gap-2' key={location.value}>
                <input
                  type='checkbox'
                  name='location'
                  className='max-width '
                  checked={filters.location.includes(location.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        location: [...filters.location, location.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        location: filters.location.filter(
                          (item) => item !== location.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor='location'>{location.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Filters;