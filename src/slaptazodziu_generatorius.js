import React, { useState, useEffect, useRef }  from 'react';
import './slaptazodziu_generatorius.css'
import CopyButton from './copy_button';


// Kaip ir viskas veikia, įskaitant localstorage, tik kol kas nepavyko padaryti, kad užloadinus būtų pažymėtos didžiosios ir mažosios raidės. Nenaudojau css frameworkų.


const Generator = () => {
    let [password, setPassword] = useState('')
    // let [copiedPassword, setCoppiedPassword] = useState('')
    let [mouseOver, setMouseOver] = useState(false)

    let [passwordLength, setPasswordLength] = useState(5)
    let [previousPasswords, setPreviousPasswords] = useState([])
    let [includesUpperCase, SetIncludesUpperCase] = useState(true)
    let [includesLowerCase, SetIncludesLowerrCase] = useState(true)
    let [includesNumbers, SetIncludesNumbers] = useState(true)
    let [includesSymbols, SetIncludesSymbols] = useState(true)
    let [allCharacters, setAllCharacters] = useState('')

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
        }

    let addUpperCase = () => {
        SetIncludesUpperCase(!includesUpperCase)
        if (includesUpperCase) {
            setAllCharacters(allCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        }
        else
            {setAllCharacters(allCharacters.replace('ABCDEFGHIJKLMNOPQRSTUVWXYZ', ''))}
    }

    let addLowerCase = () => {
        SetIncludesLowerrCase(!includesLowerCase)
        if (includesLowerCase) {
            setAllCharacters(allCharacters += 'abcdefghijklmnopqrstuvwxyz')
        }
        else
        {setAllCharacters(allCharacters.replace('abcdefghijklmnopqrstuvwxyz', ''))}
    }

    let addNumbers = () => {
        SetIncludesNumbers(!includesNumbers)
        if (includesNumbers) {
            setAllCharacters(allCharacters += '0123456789')
        }
        else
        {setAllCharacters(allCharacters.replace('0123456789', ''))}
    }

    let addSymbols = () => {
        SetIncludesSymbols(!includesSymbols)
        if (includesSymbols) {
            setAllCharacters(allCharacters += '!@#$%^&*()<>,.?/[]{}-=_+|/')
        }
        else
        {setAllCharacters(allCharacters.replace('!@#$%^&*()<>,.?/[]{}-=_+|/', ''))}
    }


    let generatePassword = () => {
        setPassword(password = '')
        console.log(allCharacters)
        console.log(passwordLength)
        if (allCharacters.length > 0)
            for (let i = 0; i < passwordLength; i++) {
                setPassword(password += allCharacters[getRandomInt(0, allCharacters.length)])
            }
        if (password !== '')
            setPreviousPasswords([...previousPasswords, password])
    }

    useEffect(() => {
        const retrievedItems = localStorage.getItem("passwords");
        if (!retrievedItems) localStorage.setItem("passwords", JSON.stringify(previousPasswords));
        setPreviousPasswords(JSON.parse(retrievedItems));
        }, []);

    useEffect(() => {localStorage.setItem('passwords', JSON.stringify(previousPasswords))}, [previousPasswords])


    return (
        <div className = "container">
            <div className = "generatorContainer">
                <h2>Slaptažodžių generatorius</h2>
                <div className = "options">
                    <div className = "option"><label htmlFor="ilgumas">Nustatykite slaptažodžio ilgį: </label>
                    <input type="number" name="ilgumas" className = "selectLength" defaultValue = "5" min="5" max="50" onChange = {(event) => setPasswordLength(event.target.value)}></input></div>
                    <div className = "option"><label htmlFor="didziosios">Naudoti didžiasias raides</label>
                    <input type="checkbox" name="didziosios" className = "checkBox" onChange = {addUpperCase}></input></div>
                    <div className = "option"><label htmlFor="mazosios">Naudoti mažasias raides</label>
                    <input type="checkbox" name="mazosios" className = "checkBox" onChange = {addLowerCase}></input></div>
                    <div className = "option"><label htmlFor="skaiciai">Naudoti skaičius</label>
                    <input type="checkbox" name="skaiciai" className = "checkBox" onChange = {addNumbers}></input></div>
                    <div className = "option"><label htmlFor="simboliai">Naudoti simbolius</label>
                    <input type="checkbox" name="simboliai" className = "checkBox" onChange = {addSymbols}></input></div>
                </div>
                <button onClick = { generatePassword } className = "generatePassword">Generuoti</button><br/>
                <div className = "passwordBox" style = {{display: password !== '' ? "inline-flex" : "none", position: "relative"}}>
                    { password }
                    <CopyButton
                    onHoverMessage = 'Kopijuoti slaptažodį'
                    copiedPassword = {password}
                    />
                </div>
                </div>
            <div className = "previousPasswordsContainer">
                <h4>Ankstesni slaptažodžiai</h4>
                {previousPasswords.map((value, index) => <div key = { index }>{ value }</div>)}
            </div>
        </div>
    );
};

export default Generator;