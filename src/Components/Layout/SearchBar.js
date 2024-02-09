import React from 'react'
import "./SearchBar.css"

function SearchBar() {
  return (
   <div className="mainSearchBar">
   
    <div className='pefCL'>
      <form> 
        <div className="_2tsx8">
            <div className="_1dsEv">
                <span className='gtFC'>
                    <input type="radio" checked value="sale" id="search_category_sale" name='listing_type' className='_1thjdMR' />
                    <label for="search_category_sale" className='_5exPRD' >Buy</label>
                </span>
                <span className='gtFC'>
                    <input type="radio" value="rent" id="search_category_sale" className='_1thjdMR' name='listing_type' />
                    <label for="search_category_sale" className='_5exPRD' >Rent</label>
                </span>
                <span className='gtFC'>
                    <input type="radio" value="property_value" id="search_category_sale" className='_1thjdMR' name='listing_type' />
                    <label for="search_category_sale" className='_5exPRD' >Property Value</label>
                </span>
            
            </div>
            
        <div className="_2BsuBB">
            <div className="_5eddFC">
            <svg className='_2swl_ _2swl_' fill='#ccc' width="24" height="24" viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
             <path d="M16.7585 14.9558H15.8131L15.4781 14.6329C16.914 12.9586 17.6559 10.6744 17.2491 8.2467C16.6867 4.92206 13.9105 2.26714 10.56 1.86053C5.49833 1.23866 1.23839 5.4961 1.86063 10.5548C2.26748 13.9034 4.92396 16.6779 8.25054 17.2399C10.6797 17.6466 12.9652 16.9051 14.6405 15.47L14.9635 15.8049V16.7496L20.0491 21.8322C20.5398 22.3226 21.3415 22.3226 21.8321 21.8322C22.3227 21.3419 22.3227 20.5407 21.8321 20.0503L16.7585 14.9558ZM9.57878 14.9558C6.59921 14.9558 4.19402 12.552 4.19402 9.57416C4.19402 6.59634 6.59921 4.19256 9.57878 4.19256C12.5583 4.19256 14.9635 6.59634 14.9635 9.57416C14.9635 12.552 12.5583 14.9558 9.57878 14.9558Z"></path>
            </svg>
            <div className='_Iklmso -TrtR'>
               <input type="search" className='_enlj LG_iJ WDcf' spellCheck="false" tabIndex="-1" autoComplete='off' autoCorrect='false' value/>
                <div role='combobox' aria-haspopup="listbox" aria-owns='react-auto-autowhatever-1' aria-aria-expanded="false" className='_3qIiL'>
                   <input type="search"   aria-autocomplete='list'  name='name' placeholder='Seach for a residential or commercial property' className='_2UR4r LG_iJ ignore-react-onclickoutside'  />
                </div>   
            </div>
            </div>
            <button className='_1hbn _u8hKV _1P_YF' type='Submit'>
                <span className='_7cgueM'>
                    <span>
                        <span>Search</span>
                    </span>
                    <span></span>
                </span>
            </button>
        </div>
        </div>
      </form>
      <span>
        <div className="_2dVMm">
           <div className="_4oldDM _2KYvl">
              <div tabIndex="0" role='button' className='_2kmMb'>
                 <span className='_1dg5o _1tYPT'>Price Range</span>
                 <svg fill='#ccc' width="12" height="12" className='_2383q' viewBox='0 0 8 12'>
                 <path d="M7.88,2.9925 L4,6.8725 L0.12,2.9925 C-0.27,2.6025 -0.9,2.6025 -1.29,2.9925 C-1.68,3.3825 -1.68,4.0125 -1.29,4.4025 L3.3,8.9925 C3.69,9.3825 4.32,9.3825 4.71,8.9925 L9.3,4.4025 C9.69,4.0125 9.69,3.3825 9.3,2.9925 C8.91,2.6125 8.27,2.6025 7.88,2.9925 L7.88,2.9925 Z" transform="translate(4, 6) rotate(0) translate(-4, -6)"></path>
                 </svg>
              </div>
              <div className='_4gvMP'></div>
           </div>
           <div className="_2KYvl">
              <div tabIndex="0" role='button' className='_2kmMb'>
                 <span className='_1dg5o _1tYPT'>Property Types</span>
                 <svg fill='#ccc' width="12" height="12" className='_2383q' viewBox='0 0 8 12'>
                 <path d="M7.88,2.9925 L4,6.8725 L0.12,2.9925 C-0.27,2.6025 -0.9,2.6025 -1.29,2.9925 C-1.68,3.3825 -1.68,4.0125 -1.29,4.4025 L3.3,8.9925 C3.69,9.3825 4.32,9.3825 4.71,8.9925 L9.3,4.4025 C9.69,4.0125 9.69,3.3825 9.3,2.9925 C8.91,2.6125 8.27,2.6025 7.88,2.9925 L7.88,2.9925 Z" transform="translate(4, 6) rotate(0) translate(-4, -6)"></path>
                 </svg>
              </div>
              <div className='_4gvMP'></div>
           </div>
           <div className="_2KYvl">
              <div tabIndex="0" role='button' className='_2kmMb'>
                 <span className='_1dg5o _1tYPT'>Bedroom</span>
                 <svg fill='#ccc' width="12" height="12" className='_2383q' viewBox='0 0 8 12'>
                 <path d="M7.88,2.9925 L4,6.8725 L0.12,2.9925 C-0.27,2.6025 -0.9,2.6025 -1.29,2.9925 C-1.68,3.3825 -1.68,4.0125 -1.29,4.4025 L3.3,8.9925 C3.69,9.3825 4.32,9.3825 4.71,8.9925 L9.3,4.4025 C9.69,4.0125 9.69,3.3825 9.3,2.9925 C8.91,2.6125 8.27,2.6025 7.88,2.9925 L7.88,2.9925 Z" transform="translate(4, 6) rotate(0) translate(-4, -6)"></path>
                 </svg>
              </div>
              <div className='_4gvMP'></div>
           </div>
           <div className="IsjHM _2KYvl">
              <div tabIndex="0" role='button' className='_2kmMb'>
                 <span className='_1dg5o _1tYPT'>Rental Types</span>
                 <svg fill='#ccc' width="12" height="12" className='_2383q' viewBox='0 0 8 12'>
                 <path d="M7.88,2.9925 L4,6.8725 L0.12,2.9925 C-0.27,2.6025 -0.9,2.6025 -1.29,2.9925 C-1.68,3.3825 -1.68,4.0125 -1.29,4.4025 L3.3,8.9925 C3.69,9.3825 4.32,9.3825 4.71,8.9925 L9.3,4.4025 C9.69,4.0125 9.69,3.3825 9.3,2.9925 C8.91,2.6125 8.27,2.6025 7.88,2.9925 L7.88,2.9925 Z" transform="translate(4, 6) rotate(0) translate(-4, -6)"></path>
                 </svg>
              </div>
              <div className='_4gvMP'></div>
           </div>
        </div>
      </span>
    </div>
    </div>
  )
  }

export default SearchBar
