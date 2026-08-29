import Lights from './Lights.jsx'
import { Level } from './Level.js'
import Player from './Player.js'
import { Physics } from '@react-three/rapier'

export default function Experience()
{
    return <>

        <Physics debu={ false }>
            <Lights />
            <Level />
            <Player />
        </Physics>

    </>
}