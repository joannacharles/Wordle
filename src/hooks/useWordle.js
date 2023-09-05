import {useState} from 'react'

const useWordle =(solution)=>{
    const [turn,setTurn]=useState(0)
    const [currentGuess, setCurrentGuess]=useState('')
    const [guesses,setGuesses]=useState([...Array(6)])// output element
    const [history,setHistory]=useState([])
    const [isCorrect,setIsCorrect]=useState(false)
    const [usedKeys,setUsedKeys]=useState({})  
    
    const formatGuess=()=>{
        let solutionArray=[...solution]

        let formattedGuess=[...currentGuess].map((l)=>{ 
                                    return {'key':l,'color':'grey'}})


        // find green 
        
        formattedGuess.forEach((obj,i)=>{
                if(obj.key===solution[i])
                {
                obj.color='green'//joan
                solutionArray[i]=null
                }
        })
        // fing yellow
        formattedGuess.forEach((l,i)=>{
            if(solutionArray.includes(l.key) && l.color!=='green'){
                l.color='yellow'
                solutionArray[solutionArray.indexOf(l.key)]=null
            }
        })

        return formattedGuess
    }
    // guesses
    const addNewGuess=(formattedGuess)=>{
        if(currentGuess===solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses)=>{
            let newGuesses=[...prevGuesses]
            newGuesses[turn]= formattedGuess
            return newGuesses
        })
        setHistory((prevHistory)=>{
            return [...prevHistory,currentGuess]
        })
        setTurn((prevTurn)=>{
            return prevTurn+1
        })
        setUsedKeys((prevUsedKeys)=>{
            let newKeys={...prevUsedKeys}
            formattedGuess.forEach((letter)=>{
                const currentColor=newKeys[letter.key]

                if(letter.color ==='green'){
                    newKeys[letter.key]='green'
                    return
                }
                if(letter.color ==='green' && currentColor!=='green'){
                    newKeys[letter.key]='yellow'
                    return
                }
                if(letter.color ==='grey' && currentColor!=='green' && currentColor!=='yellow'){
                    newKeys[letter.key]='grey'
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess('')
    }

    const handleKeyup=({key})=>{
        if(key==='Enter'){
            if(turn>5){
                console.log('you used all your guesses')
                return
            }
            if(history.includes(currentGuess)){
               console.log('you already tried that word')
               return
            }
            if(currentGuess.length!==5){
                console.log('You need 5 letters')
                return
            }
          //  setHistory(...history,currentGuess)
           const ret= formatGuess()
           addNewGuess(ret)
        }
        if(key==='Backspace'){
            //if(currentGuess.length>0){
                setCurrentGuess((prev)=>{
                    return prev.slice(0,-1)
                })
                return
            //}
            
        }
        if(/^[A-Za-z]$/.test(key)){
           if(currentGuess.length<5){
            setCurrentGuess((prev)=>{
                return prev+key
            })
            
           }
            
        }
        
    }

    return {turn,currentGuess,guesses,isCorrect,handleKeyup, usedKeys}
}

export default useWordle