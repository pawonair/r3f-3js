import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import { Level } from './Level.js'
import Player from './Player.js'
import useGame from './stores/useGame.js'

export default function Experience()
{
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame((state) => state.blocksSeed)

    return <>

        <Physics debu={ false }>
            <Lights />
            <Level count={ blocksCount } seed={ blocksSeed } />
            <Player />
        </Physics>

    </>
}