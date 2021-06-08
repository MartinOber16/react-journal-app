import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
        
            <NoteAppBar />

            <div className="notes__content" >

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>

                <div className="notes__image">
                    <img 
                        src="https://cdn.pixabay.com/photo/2014/05/02/21/49/laptop-336373__340.jpg"
                        alt="imagen"
                    />
                </div>

            </div>

        </div>
    )
}

