import React from 'react'


const Rank = ({name, entries}) => {
    return(
        <div>
            <div className="white f4 rr">
            {
              `${name}, you have ${entries} entries`
            } 

            </div>
        </div>
    )
}

export default Rank;