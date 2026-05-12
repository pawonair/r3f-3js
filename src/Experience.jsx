import { useFrame } from '@react-three/fiber'
import { BakeShadows, OrbitControls, SoftShadows, useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
    })

    const { perfVisible } = useControls({
        perfVisible: true
    })

    const { position, color, visible } = useControls('sphere', {
        position: {
            value: { x: -2, y: 0 },
            step: 0.01,
            joystick: 'invertY'
        },
        color: 'orange',
        visible: true,
        myInterval: {
            min: 0,
            max: 10,
            value: [4, 5]
        },
        clickMe: button(() => { console.log('ok') }),
        choice: { options: ['a', 'b', 'c'] }
    })

    const { scale } = useControls('cube', {
        scale: {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        }
    })

    return <>
        
        {/* <BakeShadows /> */}
        <SoftShadows size={ 25 } samples={ 10 } focus={ 0 } />

        <color args={ [ 'ivory' ] } attach="background" />

        { perfVisible && <Perf position='top-left' /> }

        <OrbitControls makeDefault />

        <directionalLight
            ref={ directionalLight }
            castShadow position={ [ 1, 2, 3 ] }
            intensity={ 4.5 }
            castShadow
            shadow-mapSize={ [ 1024, 1024] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 5 }
            shadow-camera-right={ 5 }
            shadow-camera-bottom={ -5 }
            shadow-camera-left={ -5 }
        />
        <ambientLight intensity={ 1.5 } />

        <mesh castShadow position={ [ position.x, position.y, 0 ] } visible={ visible }>
            <sphereGeometry />
            <meshStandardMaterial color={ color } />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ scale }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}