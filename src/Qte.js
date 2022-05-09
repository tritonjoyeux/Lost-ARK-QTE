import {useState, useEffect} from 'react';

const randomQte = () => {
    const lengthOfQte = 6;
    const inputs = ['a', 'z', 'e', 'r', 'q', 's', 'd', 'f', 'w']
    let results = [];

    for(let i = 0; i < lengthOfQte; i++) {
        const random = Math.floor(Math.random() * inputs.length)
        results.push(inputs[random])
    }
    return results
}

let playerInput = [];
let qteGame = randomQte();

export const Qte = () => {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loss, setLoss] = useState(false)
    const [progress, setProgress] = useState(100)
    const [qte, setQte] = useState(qteGame)
    const [streak, setStreak] = useState(0)

    const checkQte = () => {
        if(qteGame.slice(0, playerInput.length).join('') === playerInput.join('')) {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 500)
            if(qteGame.length === playerInput.length) {
                successQte()
            }
        }else {
            fail()
        }
    }

    const successQte = () => {
        qteGame = []
        setStreak(streak + 1)
        setTimeout(() => {
            setProgress(100)
            let qt = randomQte()
            qteGame = qt
            playerInput = []
            setQte(qt)
            setError(false)
        }, 1000)
    }

    const fail = () => {
        setError(true)
        setTimeout(() => {
            let qt = randomQte()
            qteGame = qt
            playerInput = []
            setQte(qt)
            setError(false)
        }, 1000)
    }

    const keyPressQte = (event) => {
        playerInput.push(event.key)
        checkQte()
    }

    useEffect(() => {
        if(loss || qteGame.length === 0) {
            return
        }
        
        if(progress <= 0) {
            setLoss(true)
            fail()
            return
        }

        let inter
        inter = setInterval(() => {
            setProgress(progress - 0.5)
        }, 25)

        document.addEventListener('keydown', keyPressQte);
        return () => {
            clearInterval(inter)
            document.removeEventListener('keydown', keyPressQte);
        }
    }, [progress])

    return (
        <div className="qte">
            {!loss ?
                <div style={{
                    borderColor: error ? 'red' : (success ? 'green' : 'transparent'),
                    borderWidth: 3,
                    borderStyle: 'solid',
                    borderRadius: 10,
                    flexDirection: 'row',
                    display: 'flex',
                }}>
                    {qte.map((qteV, index) => {
                        return <div key={index} className={"qte-item" + (qteV === playerInput[index] ? ' good-item' : '')}>{qteV}</div>
                    })}
                </div> 
                : 
                [
                    <div className="qte-win">You {streak !== 0 ? ('win ! Streak : ' + streak) : 'loss'}</div>,
                    <button className='btn' onClick={() => {
                        window.location.reload()
                    }}>Retry ?</button>
                ]
            }

            {!loss &&
                <div style={{width: '100%'}}>
                    <div className="progress-bar" style={{width: progress + '%'}}></div>
                </div>
            }
        </div>
    )
}