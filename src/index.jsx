import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import { Leva } from 'leva'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const created = ({ gl, scene }) => {
    // gl.setClearColor('#ff0000', 1)
    scene.background = new THREE.Color('red')
}

root.render(
    <StrictMode>
        <Leva collapsed />
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 4, 3, 6 ]
            } }
            // onCreated={ created }
        >
            {/* <color args={[ '#ff0000' ]} attach="background" /> */}
            <Experience />
        </Canvas>
    </StrictMode>
)