import Row from "./Row"

export default function Grid({currentGuess,guesses,turn}){
    return(
        <div>
            {guesses.map((guess,index)=>{
                if(index===turn){
                    return <Row key={index} currentGuess={currentGuess}/>
                }
                return <Row key={index} guess={guess}/>
            })}
        </div>

    )
}