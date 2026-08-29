import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Level } from './Level.js'
import Player from './Player.js'
import { Physics } from '@react-three/rapier'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />

        <Physics debu={ false }>
            <Lights />
            <Level />
            <Player />
        </Physics>

    </>
}