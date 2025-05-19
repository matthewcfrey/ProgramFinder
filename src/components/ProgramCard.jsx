import { useState } from "react"

const ProgramCard = ({program}) => {

    return (
        <div className='program-cards'>
            <div className='program-card-top-line'>
                <div>
                    <span className='card-program-name'>{program.program_name}</span><span className='card-org-name'> - {program.org_name}</span>
                </div>
                <div className='program-card-details-box'>
                    <div className='program-card-details-button'>Program Details</div>
                    <div className='program-card-details-text '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </div>
            </div>
            <div className='program-card-second-line'>
                <div className='program-card-contact-box'>
                    <div className='one-hundred-box'>
                        <div className='smalldetails'>- [First Last]</div> <div className='smalldetails'> - [Program Phone]</div> <div className='smalldetails'> - [Program Email]</div>
                    </div>
                    <div className='hrbox'>
                        <hr></hr>
                    </div>
                    <div className='one-hundred-box'>
                        <div className='smalldetails'>- {program.site_street_one} {program.site_street_two}, {program.site_city} {program.site_state}, {program.site_zip}</div><div className='smalldetails'> - {program.neighborhood}</div> <div className='smalldetails'>- [Website]</div>
                    </div>
                </div>
                <div className='program-card-cost-box'>
                    <span className='cost'>${program.cost}</span>
                </div>
            </div>
            <div className='program-card-third-line'>
                <div className='third-line-box small-one-hundred'>
                    <span className='third-line-head'>Essential Skills Developed:</span>
                    <div>
                        [List Essential Skills Here]
                    </div>
                </div>
                <div className='third-line-box small-one-hundred'>
                    <span className='third-line-head'>Grades Served:</span>
                    <div>
                        [List grades served here]
                    </div>
                </div>
                <div className='third-line-box small-one-hundred'>
                    <span className='third-line-head'>Program Types:</span>
                    <div>
                        {program.main_program_goal}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramCard