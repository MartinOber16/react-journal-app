import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            
            <div 
                className="journal__entry-picture" 
                style={{ 
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://cdn.pixabay.com/photo/2014/05/02/21/49/laptop-336373__340.jpg)'
                }}
            >
            </div>
            
            <div className="journal__entry-body" >
                <p className="journal__entry-title">
                    Un nuevo dia
                </p>
                <p className="journal__entry-content">
                    Texto de prueba bla bla
                </p>
            </div>
            
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>


        </div>
    )
}
