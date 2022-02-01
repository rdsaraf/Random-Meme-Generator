import React from 'react'
import { myMeme } from '../Meme/Meme'
import './GeneratedMeme.css'
import { saveAs } from 'file-saver';

const GeneratedMeme = () => {

    const download = () => {
        saveAs(myMeme, 'image.jpg');
    };

    return (
        <div className='myMeme'>
            <img src={myMeme} alt="generatedMeme" />
            <button onClick={download} className='downloadBtn'>Download Your Meme</button>
        </div>
    )
}

export default GeneratedMeme
