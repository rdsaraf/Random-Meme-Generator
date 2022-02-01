import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Meme.css'


let myMeme;
const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const Meme = () => {
    //When user clicked final meme . user will redirect to /meme
    let navigate = useNavigate ();

    //Set memeUrl 
    const [memeUrl, setMemeUrl] = useState("");

    //Grabing template id 
    const [templateId, setTemplateId] = useState(0);

    //set texts captions
    const [text1, setText1] = useState(""); 
    const [text2, setText2] = useState(""); 

    //Genereating Meme Image
    const [finalMeme, setFinalMeme] = useState("");

    //Shuffling Meme Template (For random template)
    const shuffleImage = ()=>{
        window.location.reload();
    }

    //Fetching api before loading page
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(result=> {
            const randomNumber = Math.floor(Math.random()*result.data.memes.length);
            setMemeUrl(result.data.memes[randomNumber].url);
            setTemplateId(result.data.memes[randomNumber].id);
        });
    },[]);

    //Creating Meme
    const crateMemeHandler = async()=>{
        const formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);
        formData.append("template_id",templateId);
        formData.append("text0",text1);
        formData.append("text1",text2);
        const response = await fetch("https://api.imgflip.com/caption_image",{
            method: 'POST',
            body: formData
        })
        const data = await response.json();
        myMeme = data.data.url;
        setFinalMeme(myMeme);
    }

    //Redirect to generated Meme
    const redirectHandler = ()=>{
        navigate("/meme");
    }

    return (
        <div>
            <div className="memeImage">
                <button onClick={shuffleImage} className="shuffleBtn">Change Meme Template</button>
                <img src={memeUrl} alt='memeImage' />
                <div className="inputBoxes">
                    <input type="text" name="text1" id="text1" placeholder='Enter Upper Text' onChange={(e)=> setText1(e.target.value)} />
                    <input type="text" name="text2" id="text2" placeholder='Enter Bottom Text' onChange={(e)=> setText2(e.target.value)} />
                </div>
                <button disabled={finalMeme===""?false:true} onClick={crateMemeHandler} className="createMeme">{finalMeme===""?"Create Your Meme":"Your meme is ready"}</button>
                <button disabled={finalMeme===""?true:false} onClick={redirectHandler} className="finalMeme">Your Final Meme</button>
            </div>
        </div>
    )
}

export default Meme;
export {myMeme};